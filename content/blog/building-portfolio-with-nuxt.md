---
title: "Building a Portfolio Website with Nuxt 4"
description: "A step-by-step guide on how I built my personal portfolio using Nuxt 4, Vue 3, and TailwindCSS 4 — from project setup to deployment on Vercel."
date: "2026-04-20"
tags: ["Nuxt", "Vue", "TailwindCSS", "Tutorial"]
cover: "https://images.unsplash.com/photo-1773332611628-9e1bdce4881b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
---
## Getting Started

Setting up a Nuxt 4 project is straightforward. Run the following command to scaffold a new app:

```bash
npx nuxi@latest init my-portfolio
cd my-portfolio
pnpm install
```

Once installed, your project structure will look like this:

```
my-portfolio/
├── assets/
├── components/
├── layouts/
├── pages/
├── public/
└── nuxt.config.ts
```

## Configuring TailwindCSS 4

TailwindCSS 4 uses a Vite plugin instead of a PostCSS plugin. Install it:

```bash
pnpm add tailwindcss @tailwindcss/vite
```

Then register it in `nuxt.config.ts`:

```ts
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/css/main.css"],
});
```

In `assets/css/main.css`, import Tailwind:

```css
@import "tailwindcss";
```

## Creating Your First Page

Pages in Nuxt 4 use file-based routing. Create `pages/index.vue`:

```vue
<script setup lang="ts">
useHeadSafe({ title: "Home" });
</script>

<template>
  <main class="flex min-h-screen items-center justify-center">
    <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100">Hello, World!</h1>
  </main>
</template>
```

## Adding Dark Mode

Install `@nuxtjs/color-mode`:

```bash
pnpm add @nuxtjs/color-mode
```

Configure it in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["@nuxtjs/color-mode"],
  colorMode: {
    classSuffix: "",
    fallback: "light",
  },
});
```

Create a toggle composable:

```ts
// composables/useTheme.ts
export const useTheme = () => {
  const colorMode = useColorMode();

  const switchTheme = () => {
    colorMode.preference = colorMode.value === "light" ? "dark" : "light";
  };

  return { theme: colorMode, switchTheme };
};
```

## Deploying to Vercel

> Vercel automatically detects Nuxt and configures the build for you. Zero config needed.

Push your project to GitHub, then import it on [vercel.com](https://vercel.com). Your portfolio will be live in minutes with a free SSL certificate and global CDN.

That's it — a fully functional, dark-mode-ready portfolio built with the latest Nuxt 4 stack.
