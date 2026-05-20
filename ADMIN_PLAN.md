# Plan: Admin Panel for Portfolio (Git-backed, GitHub OAuth)

## Context

The site at `https://adiaryasuta.vercel.app` is currently 100% static — all "dynamic" content lives in JSON files (`data/*.json`), markdown (`content/blog/*.md`), and i18n locales (`i18n/locales/{en,id}.json`). There is no backend, no DB, no auth. The user wants an admin UI to edit all of this without touching code, plus control SEO, and the admin must not be reachable by guessing `/admin`.

**Architecture chosen (all user-confirmed):**

- **Storage:** edits commit JSON/markdown back to the GitHub repo via Octokit → Vercel auto-redeploys (~30s lag, but version-controlled, no DB cost).
- **Auth:** GitHub OAuth, allowlist a single GitHub username (the owner).
- **URL hiding:** admin routes live under a secret slug from env (`/ctrl-{random}`); `/admin`, `/login`, `/dashboard` all 404. Real security comes from auth — the slug is anti-discoverability, not the gate.
- **Blog:** keep markdown files; admin commits .md files back to `/content/blog/`.

---

## Stack additions

```bash
pnpm add nuxt-auth-utils @octokit/rest
```

- `nuxt-auth-utils` — sealed-cookie sessions + built-in GitHub OAuth handler. Official-ish Nuxt module.
- `@octokit/rest` — GitHub API client for commits.

---

## Environment variables

Add to `.env` (and Vercel project settings):

```
NUXT_SESSION_PASSWORD=<32+ char random>           # sealed cookie key
NUXT_OAUTH_GITHUB_CLIENT_ID=<from GitHub OAuth app>
NUXT_OAUTH_GITHUB_CLIENT_SECRET=<from GitHub OAuth app>
NUXT_ADMIN_GITHUB_LOGIN=adiiaryasutaa             # only this user can log in
NUXT_ADMIN_SLUG=ctrl-x7k9q2                       # secret URL slug
NUXT_GITHUB_PAT=<fine-grained PAT, contents:write on this repo>
NUXT_GITHUB_REPO_OWNER=adiiaryasutaa
NUXT_GITHUB_REPO_NAME=adiiaryasutaa-web
NUXT_GITHUB_BRANCH=main
```

Expose `adminSlug` to client via `runtimeConfig.public` so the navbar/middleware can read it on the client. Everything else stays server-only.

Create a GitHub OAuth App at `Settings → Developer settings → OAuth Apps` with callback `https://adiaryasuta.vercel.app/auth/github` (nuxt-auth-utils convention).

---

## Routing strategy (the hidden URL)

Admin pages live under a dynamic param that must match `ADMIN_SLUG`:

```
pages/[adminSlug]/index.vue       → dashboard (post-login)
pages/[adminSlug]/login.vue       → "Sign in with GitHub" button
pages/[adminSlug]/projects.vue
pages/[adminSlug]/skills.vue
pages/[adminSlug]/tech.vue
pages/[adminSlug]/tools.vue
pages/[adminSlug]/experiences.vue
pages/[adminSlug]/friends.vue
pages/[adminSlug]/blog/index.vue
pages/[adminSlug]/blog/[slug].vue
pages/[adminSlug]/seo.vue
pages/[adminSlug]/i18n.vue
```

**Route middleware** (`middleware/admin.ts`, applied via `definePageMeta({ middleware: 'admin' })` on each admin page):

- If `route.params.adminSlug !== runtimeConfig.public.adminSlug` → `throw createError({ statusCode: 404 })`. Site shows its normal 404 page; nothing leaks that an admin exists.
- If not on `/login` and not authenticated → redirect to `/{slug}/login`.

Nuxt routing precedence: `[adminSlug]/projects.vue` is more specific than the existing catch-all `pages/[...slug].vue`, so it wins for matching paths. Verify by hitting `/{wrong-slug}/projects` after build — should 404 via middleware, not render the catch-all.

---

## Auth flow

Using `nuxt-auth-utils`:

1. `pages/[adminSlug]/login.vue` shows a single button → `<a href="/auth/github">Sign in with GitHub</a>`.
2. Module handles redirect to GitHub, callback at `/auth/github`, exchanges code for token.
3. Create `server/routes/auth/github.get.ts`:
   ```ts
   export default defineOAuthGitHubEventHandler({
     async onSuccess(event, { user }) {
       const cfg = useRuntimeConfig();
       if (user.login !== cfg.adminGithubLogin) {
         throw createError({ statusCode: 403, statusMessage: "Forbidden" });
       }
       await setUserSession(event, { user: { login: user.login, avatar: user.avatar_url } });
       return sendRedirect(event, `/${cfg.public.adminSlug}`);
     },
   });
   ```
4. All `/api/admin/*` server routes require `await requireUserSession(event)` and re-check `session.user.login === adminGithubLogin`.

---

## GitHub commit layer

Single utility: `server/utils/github.ts`

```ts
import { Octokit } from "@octokit/rest";

export function useGitHub() {
  const cfg = useRuntimeConfig();
  const octokit = new Octokit({ auth: cfg.githubPat });
  const { githubRepoOwner: owner, githubRepoName: repo, githubBranch: branch } = cfg;

  return {
    async getFile(path: string) {
      const { data } = await octokit.repos.getContent({ owner, repo, path, ref: branch });
      if (Array.isArray(data) || data.type !== "file") throw new Error("Not a file");
      return {
        sha: data.sha,
        content: Buffer.from(data.content, "base64").toString("utf-8"),
      };
    },
    async putFile(path: string, content: string, message: string, sha?: string) {
      return octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        branch,
        message,
        content: Buffer.from(content, "utf-8").toString("base64"),
        sha, // omit for new files
      });
    },
    async deleteFile(path: string, message: string, sha: string) {
      return octokit.repos.deleteFile({ owner, repo, path, branch, message, sha });
    },
  };
}
```

Every save:

1. `GET` the file to obtain its current SHA (prevents stale-write conflicts).
2. `PUT` new content with that SHA + a commit message like `chore(admin): update data/project.json`.
3. Return `{ ok: true, redeployInSeconds: 30 }` so UI can show a banner.

---

## Server API routes

Generic handlers (one resource per file under `server/api/admin/`):

```
server/api/admin/data/[resource].get.ts    # GET   /api/admin/data/projects → reads from GitHub
server/api/admin/data/[resource].put.ts    # PUT   /api/admin/data/projects → commits new JSON
server/api/admin/blog/index.get.ts         # list .md files
server/api/admin/blog/[slug].get.ts        # read .md (frontmatter + body)
server/api/admin/blog/[slug].put.ts        # write .md
server/api/admin/blog/[slug].delete.ts     # delete .md
server/api/admin/locale/[lang].get.ts      # read i18n/locales/en.json | id.json
server/api/admin/locale/[lang].put.ts      # write locale
server/api/admin/seo.get.ts                # read data/seo.json (new)
server/api/admin/seo.put.ts                # write data/seo.json
server/api/admin/upload.post.ts            # upload image asset → commits to public/assets/imgs/
```

`[resource]` is whitelisted to: `project`, `skill`, `tech`, `tool`, `friend`, `experience/work`, `experience/education`, `experience/volunteer`. Anything else → 400.

All routes start with `await requireUserSession(event)` + `assertAdmin(session)`.

---

## Data files needing migration

| Current location                                                                                              | Action                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `composables/useFriend.ts` (hardcoded array)                                                                  | Move to `data/friend.json`; update composable to import the JSON. Same pattern as `useTool`/`useSkill`.                                                                                      |
| `composables/useProject.ts` (already uses `data/project.json`)                                                | Verify, no change.                                                                                                                                                                           |
| Site-level SEO hardcoded in `nuxt.config.ts` (`site.url`, `app.head.meta` OG defaults, theme color) | Move dynamic bits (default OG image, theme color) to `data/seo.json`. Read with `import seo from './data/seo.json'` in `nuxt.config.ts` and a `useSeo()` composable for runtime use. |

New file `data/seo.json`:

```json
{
  "siteName": "Adi Aryasuta",
  "siteUrl": "https://adiaryasuta.vercel.app",
  "defaultOgImage": "https://adiaryasuta.vercel.app/assets/imgs/adiaryasuta.jpg",
  "themeColor": "#0284c7",
  "twitterHandle": ""
}
```

Per-page meta descriptions stay in `i18n/locales/{en,id}.json` under `meta.*` (already added in previous SEO work) — edited via the i18n admin page.

---

## Admin UI — page-by-page

Build with native Vue 3 + Tailwind. No extra component library.

### Shared

- `components/admin/AdminShell.vue` — sidebar nav + topbar with user avatar, logout, "Last commit: 2m ago" indicator.
- `components/admin/SaveBar.vue` — sticky bottom bar with Save / Discard buttons; shows pending state and a "Will redeploy in ~30s" toast after success.
- `composables/useAdminResource.ts` — generic `{ data, isDirty, load(), save(), discard() }` wrapper around `/api/admin/data/[resource]` for any JSON resource.

### Per-resource editors

| Page              | Resource(s)                          | UI                                                                                                                                                                                                                                                                                                                       |
| ----------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `projects.vue`    | `data/project.json`                  | List + add/remove rows. Per row: name, description, tags (array input), repo provider/url, preview. Cover image: upload widget.                                                                                                                                                                                          |
| `skills.vue`      | `data/skill.json`                    | Two sections (`highlight`, `other`). Per row: logo (image upload), name, description (highlight only).                                                                                                                                                                                                                   |
| `tech.vue`        | `data/tech.json`                     | Tabs per category (backend, frontend, database, …). Per row: logo, name, `highlight` toggle, description.                                                                                                                                                                                                                |
| `tools.vue`       | `data/tool.json`                     | Single list: logo + name per row.                                                                                                                                                                                                                                                                                        |
| `experiences.vue` | three JSON files                     | Tabs: Work / Education / Volunteer. Each with month-year pickers for start/end + `current` checkbox. Media array (image upload).                                                                                                                                                                                         |
| `friends.vue`     | `data/friend.json`                   | List of photo + name + jobTitle + socials[{platform, url}].                                                                                                                                                                                                                                                              |
| `blog/index.vue`  | list `.md` in `/content/blog/`       | Table: title, date, tags, actions (edit/delete). "New post" button.                                                                                                                                                                                                                                                      |
| `blog/[slug].vue` | one `.md`                            | Two-pane: form for frontmatter (title, description, date, tags, cover) on top; **`<textarea>`** for body markdown on left, **live `<ContentRenderer :value="parsed">` preview** on right. Use `parseContent` from `@nuxt/content` on the server (`/api/admin/blog/preview.post.ts`) to render preview. Slug = filename, editable on create only. |
| `seo.vue`         | `data/seo.json`                      | Form: site name, site URL, default OG image (upload), theme color (color picker), Twitter handle.                                                                                                                                                                                                                        |
| `i18n.vue`        | `i18n/locales/{en,id}.json`          | Two-column side-by-side (EN ↔ ID) tree editor of all locale keys. Highlight `meta.*` section at top since that's the SEO.                                                                                                                                                                                                |

### Image uploads

`POST /api/admin/upload` accepts a file, generates a slugged filename, commits to `public/assets/imgs/{section}/{filename}`, returns the URL path. UI uses this for cover images, logos, friend photos, work-experience media.

---

## Decoy / hardening

- Add `pages/admin.vue`, `pages/login.vue`, `pages/dashboard.vue` (or middleware that intercepts them) — each just `throw createError({ statusCode: 404 })`. Same 404 as a non-existent page; no signal that an admin exists.
- `robots.txt`: explicitly `Disallow: /` for the admin slug pattern is **not** safe (it leaks the slug). Instead, rely on the slug being random and the routes being noindex via middleware setting `X-Robots-Tag: noindex, nofollow` on all `/{slug}/*` responses (in a server middleware that detects the slug param).
- Rate-limit `/auth/github` callback abuse via simple in-memory map keyed by IP (optional, light).

---

## Phased delivery

The plan is large; recommend implementing in phases, each independently shippable:

1. **Phase 1 — Foundation** (no UI yet): env setup, nuxt-auth-utils install, GitHub OAuth handler, `[adminSlug]` routing + middleware, decoy 404s, `useGitHub()` util, one end-to-end test endpoint that reads `data/project.json` from GitHub.
2. **Phase 2 — JSON resource editors**: AdminShell, generic resource composable, editors for projects/skills/tools/tech/experiences/friends. Migrate `useFriend` to JSON. Image upload endpoint.
3. **Phase 3 — Blog editor**: list view, create/edit/delete .md files, live preview endpoint.
4. **Phase 4 — SEO + i18n editor**: move site SEO to `data/seo.json`, build seo.vue + i18n.vue editors.

---

## Critical files

| File                                                                 | Change                                                                                                                  |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `nuxt.config.ts`                                                     | add `nuxt-auth-utils` to modules; add `runtimeConfig` block exposing GitHub/admin vars; consume `data/seo.json` for site-level SEO. |
| `.env.example`                                                       | new — document required env vars (sample values only, no secrets).                                                      |
| `middleware/admin.ts`                                                | new — slug check + auth gate.                                                                                           |
| `server/utils/github.ts`                                             | new — Octokit wrapper.                                                                                                  |
| `server/utils/admin.ts`                                              | new — `assertAdmin(session)` helper.                                                                                    |
| `server/routes/auth/github.get.ts`                                   | new — OAuth handler.                                                                                                    |
| `server/api/admin/**/*.ts`                                           | new — all admin endpoints listed above.                                                                                 |
| `pages/[adminSlug]/**/*.vue`                                         | new — all admin UI pages.                                                                                               |
| `components/admin/**/*.vue`                                          | new — AdminShell, SaveBar, form atoms.                                                                                  |
| `composables/useAdminResource.ts`                                    | new — generic resource hook.                                                                                            |
| `composables/useFriend.ts`                                           | refactor to read from `data/friend.json`.                                                                               |
| `data/friend.json`                                                   | new — migrated friends data.                                                                                            |
| `data/seo.json`                                                      | new — site SEO.                                                                                                         |
| `pages/admin.vue`, `pages/login.vue`, `pages/dashboard.vue`          | new — explicit 404 decoys.                                                                                              |

---

## Verification

After Phase 1:

- Hit `/admin`, `/login`, `/dashboard`, `/{wrong-slug}` → all 404 with no admin hint.
- Hit `/{correct-slug}` while logged out → redirects to `/{slug}/login`.
- Click "Sign in with GitHub" with non-allowlisted account → 403.
- Sign in with allowlisted account → land on dashboard.
- Curl `/api/admin/data/project` without session → 401.

After Phase 2:

- Edit a project, click Save → see new commit in GitHub repo within seconds.
- Watch Vercel deploy trigger; ~30s later refresh public site → change live.
- Upload an image → committed under `public/assets/imgs/`, URL returned and usable.

After Phase 3:

- Create a new blog post in admin → new `.md` file in `content/blog/` on `main`.
- Live preview matches the published article post-deploy (Shiki highlighting intact).

After Phase 4:

- Edit `meta.about-description` in i18n editor → committed to both `en.json` and `id.json` (or just one if user picks per-locale).
- Change theme color in seo.vue → `data/seo.json` updates → next deploy reflects it in `<meta name="theme-color">`.
- Open the public site in OpenGraph debugger → confirm new OG image / description.

---

## Out of scope

- Multi-user / role-based permissions (single-owner only).
- Real-time collaboration / draft autosave (the GitHub commit IS the save).
- Image cropping/resize in browser (upload as-is; do offline if needed).
- Comments, analytics, page-view tracking on admin pages.
