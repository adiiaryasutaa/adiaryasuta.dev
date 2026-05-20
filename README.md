# adiaryasuta.dev

Personal portfolio website built with Nuxt 4, Vue 3, and TailwindCSS 4. Features a git-backed admin panel for managing all content without touching code.

**Live site:** [adiaryasuta.dev](https://adiaryasuta.dev)

## Built with

| | |
|---|---|
| [Adi Aryasuta](https://github.com/adiiaryasutaa) | Author |
| [Claude](https://claude.ai/code) | Co-developer |

## Tech Stack

- **Framework:** Nuxt 4 + Vue 3
- **Styling:** TailwindCSS 4
- **Content:** [@nuxt/content](https://content.nuxt.com) (blog markdown)
- **i18n:** [@nuxtjs/i18n](https://i18n.nuxtjs.org) (EN / ID)
- **Auth:** [nuxt-auth-utils](https://github.com/Atinux/nuxt-auth-utils) (GitHub OAuth)
- **Deployment:** Vercel

## Getting Started

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

## Environment Variables

| Variable | Description |
|---|---|
| `NUXT_SESSION_PASSWORD` | 32+ char secret for sealed cookies (`openssl rand -base64 32`) |
| `NUXT_OAUTH_GITHUB_CLIENT_ID` | GitHub OAuth App client ID |
| `NUXT_OAUTH_GITHUB_CLIENT_SECRET` | GitHub OAuth App client secret |
| `NUXT_OAUTH_GITHUB_REDIRECT_URL` | OAuth callback URL (local: `http://localhost:3000/auth/github`) |
| `NUXT_ADMIN_GITHUB_LOGIN` | GitHub username allowed to access admin |
| `NUXT_ADMIN_SLUG` | Secret URL slug for admin panel (e.g. `openssl rand -hex 6`) |
| `NUXT_PUBLIC_ADMIN_SLUG` | Same value as `NUXT_ADMIN_SLUG` (exposed to client) |
| `NUXT_GITHUB_PAT` | Fine-grained PAT with Contents read+write on this repo |
| `NUXT_GITHUB_REPO_OWNER` | GitHub username |
| `NUXT_GITHUB_REPO_NAME` | Repository name |
| `NUXT_GITHUB_BRANCH` | Branch to commit admin edits to (`main` for production) |

## Admin Panel

The admin panel lives at `/{NUXT_ADMIN_SLUG}` — a secret URL slug set via env. It is never linked from the public site.

- **Auth:** Sign in with GitHub (only the allowlisted login can access)
- **Storage:** Edits commit directly to GitHub via the API — no database. Vercel auto-redeploys on every commit (~30s).
- **In development:** reads and writes local files directly (no GitHub API calls)
- **In production:** commits changes to the configured branch via Octokit

### Managed content

- Projects, Skills, Tech stack, Tools, Experiences, Friends (`data/*.json`)
- Blog posts (`content/blog/*.md`)
- i18n strings (`i18n/locales/{en,id}.json`)
- SEO defaults (`data/seo.json`)

## Project Structure

```
pages/              # Routes (including [adminSlug]/* for admin)
components/
  ui/               # Atoms
  cards/            # Molecules
  sections/         # Organisms
  admin/            # Admin UI (AdminShell, SaveBar)
composables/        # useProject, useTool, useSkill, useFriend, useAdminResource
data/               # JSON content files
content/blog/       # Markdown blog posts
models/             # TypeScript interfaces + data loader functions
server/
  api/admin/        # Admin CRUD endpoints
  routes/auth/      # GitHub OAuth handler
  utils/            # github.ts (Octokit wrapper), admin.ts (auth helper)
i18n/locales/       # en.json, id.json
```

## Scripts

```bash
pnpm dev        # Development server at http://localhost:3000
pnpm build      # Production build
pnpm preview    # Preview production build locally
pnpm generate   # Static site generation
pnpm format     # Format with Prettier
```

## Branching

| Branch | Purpose |
|---|---|
| `main` | Production — deploys to [adiaryasuta.dev](https://adiaryasuta.dev) |
| `dev` | Development — deploys to Vercel preview URL |

All work happens on `dev`. Open a PR to merge into `main` for production.
