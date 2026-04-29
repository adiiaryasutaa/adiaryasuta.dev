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

### P.S.:
If there's action can be done by excecuting commands, do it. Don't generate by your self.
Do with best practices. Ask me anything about something unclear. Don't hallucinating.