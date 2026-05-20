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

**Nuxt 4** portfolio website with Vue 3 and TailwindCSS 4.

### Core Structure

- **Pages**: `pages/index.vue` (home), `pages/about.vue`, `pages/project.vue`
- **Layouts**: Single `layouts/default.vue` with Navbar + Footer wrapper
- **Components**:
  - Reusable UI: `Card.vue`, `Container.vue`, `ContainerTitle.vue`, `MainSection.vue`
  - Section components: `HomeSection`, `AboutSection`, `SkillSection`, `TechStackSection`, `ExperienceSection`, `ProjectSection`, `ToolSection`, `SocialMediaSection`
  - Card variants: `SkillCard`, `ToolCard`, `ProjectCard`, `WorkExperienceCard`, `EducationExperienceCard`, `VolunteerExperienceCard`, `HighlightTechCard`
  - Utilities: `Navbar`, `Footer`, `LanguageButton`, `ThemeButton`, `TechChip`

### Data Flow

- **Models** (`models/*.ts`): TypeScript interfaces for `Skill`, `Tool`, `Project`, `Tech`, `Experience`
- **Composables** (`composables/*.ts`): `useSkill`, `useTool`, `useProject`, `useLocale`, `useTheme` - provide reactive data and utilities
- **i18n**: English and Indonesian locales via `@nuxtjs/i18n`, configured in `i18n.config.ts`

### Styling

- TailwindCSS 4 with Vite plugin
- Custom CSS in `assets/css/main.css`
- Dark mode support via `@nuxtjs/color-mode`
- Page transitions enabled

### Key Patterns

- Components receive data from parent pages via props
- Localization accessed via `$t()` in templates
- Theme toggling via `useTheme` composable
- Language switching via `useLocale` composable

## Rules

1. **No hallucinating** — never guess, invent, or assume details about the codebase, APIs, or behavior. Read the actual files first.
2. **Ask before assuming** — if anything is unclear, ask. Prefer asking many specific questions over producing a hallucinated response.
3. **Best practices always** — follow language, framework, and security best practices at all times.
4. **Prefer commands over generation** — if an action can be done by executing a command, run it instead of generating the output manually.