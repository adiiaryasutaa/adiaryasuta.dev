# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install    # Install dependencies
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm preview    # Preview production build locally
pnpm generate   # Generate static site
```

## Architecture

**Nuxt 4** portfolio website with Vue 3 and TailwindCSS 4. Deployed to Vercel (project ID: `prj_CxKUdHHKaoY8J9Q4oVhGl5o78AiX`). Domain: `adiaryasuta.dev`.

### Core Structure

- **Pages** (`pages/`):
  - `index.vue` — Home
  - `about.vue` — About + Experience + Tech Stack
  - `project.vue` — Projects
  - `blog/index.vue` — Blog list
  - `blog/[slug].vue` — Blog post with related posts + reading time
  - `friend.vue` — Friends page
  - `[...slug].vue` — Catch-all (404 fallback)
  - `admin.vue`, `login.vue`, `dashboard.vue` — Decoy 404 pages (anti-discoverability)
  - `[adminSlug]/**` — Hidden admin panel (see Admin Panel section)

- **Layouts**: Single `layouts/default.vue` — Navbar + Footer wrapper

- **Components** (atomic design, `pathPrefix: false` so tags match filename not folder):
  - `components/ui/` — Atoms: `Card`, `LanguageButton`, `ThemeButton`, `NavbarItem`, `TechChip`, `TagList`, `SocialLinks`, `TimeRange`, `Paragraph`, `icons/`
  - `components/cards/` — Molecules: `BlogCard`, `ProjectCard`, `SkillCard`, `ToolCard`, `FriendCard`, `HighlightTechCard`, `WorkExperienceCard`, `EducationExperienceCard`, `VolunteerExperienceCard`
  - `components/sections/` — Organisms: `Navbar`, `Footer`, `HomeSection`, `AboutSection`, `SkillSection`, `TechStackSection`, `ExperienceSection`, `ProjectSection`, `ToolSection`, `BlogSection`, `FriendSection`, `SocialMediaSection`
  - `components/layout/` — Templates: `Container`, `ContainerTitle`, `MainSection`
  - `components/content/` — Nuxt Content overrides: `ProsePre` (Shiki code blocks)
  - `components/admin/` — Admin UI (prefixed `Admin`): `AdminShell`, `SaveBar`

### Data Flow

- **Models** (`models/*.ts`): TypeScript interfaces — `Skill`, `Tool`, `Project`, `Tech`, `Experience` (work/education/volunteer), `Friend`, `Blog`, `Tag`, `Repository`, `Preview`
- **Data files** (`data/*.json`): All dynamic content — `project.json`, `skill.json`, `tech.json`, `tool.json`, `friend.json`, `seo.json`, `experience/work.json`, `experience/education.json`, `experience/volunteer.json`
- **Composables** (`composables/*.ts`): `useSkill`, `useTool`, `useProject`, `useFriend` (reads from `data/friend.json`), `useLocale`, `useTheme`, `useAdminResource`
- **i18n**: EN/ID locales via `@nuxtjs/i18n`, files at `i18n/locales/{en,id}.json`
- **Blog**: Markdown files at `content/blog/*.md` via `@nuxt/content`. Frontmatter: `title`, `description`, `date`, `tags`, `cover`

### Styling

- TailwindCSS 4 with Vite plugin (`@tailwindcss/vite`)
- Custom CSS in `assets/css/main.css` (defines `--primary` CSS var and base styles)
- Dark mode via `@nuxtjs/color-mode` (`classSuffix: ""`, fallback: `light`)
- **TailwindCSS v4 note**: uses CSS `translate` property (not `transform`) for translate utilities — use scoped CSS for scroll-hide transitions
- Page transitions enabled (`name: "page", mode: "out-in"`)
- Shiki syntax highlighting: single `theme: "github-dark"` (inline styles, not CSS class strategy)

### SEO

- Per-page `useSeoMeta()` + JSON-LD structured data on `index.vue` and `blog/[slug].vue`
- Sitemap via `@nuxtjs/sitemap` at `/sitemap.xml`
- `public/robots.txt` references sitemap
- Site URL: `https://adiaryasuta.dev`

---

## Admin Panel

The admin panel is a git-backed CMS. All edits commit to GitHub via the Octokit API; Vercel auto-redeploys (~30s).

### Access

- URL: `/{NUXT_ADMIN_SLUG}/` (secret slug from env, never `/admin` or `/dashboard`)
- Auth: GitHub OAuth via `nuxt-auth-utils` — only the allowlisted GitHub login (`NUXT_ADMIN_GITHUB_LOGIN`) can log in
- Middleware: `middleware/admin.ts` — 404s on wrong slug, redirects to login if unauthenticated

### Server Layer

- `server/utils/github.ts` — Octokit wrapper (`getFile`, `putFile`, `listDir`, `deleteFile`)
- `server/utils/admin.ts` — `assertAdmin(event)` helper (checks session + allowlist)
- `server/routes/auth/github.get.ts` — OAuth handler; `server/routes/auth/logout.post.ts` — logout
- `server/api/admin/data/[resource].{get,put}.ts` — read/write JSON data files
- `server/api/admin/blog/{index.get, [slug].get, [slug].put, [slug].delete}.ts` — blog CRUD
- `server/api/admin/locale/[lang].{get,put}.ts` — i18n locale editing
- `server/api/admin/seo.{get,put}.ts` — `data/seo.json`
- `server/api/admin/upload.post.ts` — image upload → commits to `public/assets/imgs/`

### Required Environment Variables

```
NUXT_SESSION_PASSWORD=          # 32+ char random string
NUXT_OAUTH_GITHUB_CLIENT_ID=
NUXT_OAUTH_GITHUB_CLIENT_SECRET=
NUXT_ADMIN_GITHUB_LOGIN=adiiaryasutaa
NUXT_ADMIN_SLUG=                # secret URL slug
NUXT_GITHUB_PAT=                # fine-grained PAT, contents:write
NUXT_GITHUB_REPO_OWNER=adiiaryasutaa
NUXT_GITHUB_REPO_NAME=adiiaryasutaa-web
NUXT_GITHUB_BRANCH=main
```

GitHub OAuth App callback: `https://adiaryasuta.dev/auth/github`

### Types

`types/auth.d.ts` augments `nuxt-auth-utils` `User` type with `{ login, avatar, name }`.

---

## Rules

1. **No hallucinating** — never guess, invent, or assume details about the codebase, APIs, or behavior. Read the actual files first.
2. **Ask before assuming** — if anything is unclear, ask. Prefer asking many specific questions over producing a hallucinated response.
3. **Best practices always** — follow language, framework, and security best practices at all times.
4. **Prefer commands over generation** — if an action can be done by executing a command, run it instead of generating the output manually.
