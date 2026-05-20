---
title: "Implementing Dark Mode with @nuxtjs/color-mode"
description: "Learn how to add dark mode support to your Nuxt app using the @nuxtjs/color-mode module, with persistent preference stored in a cookie."
tags: ["Nuxt", "TailwindCSS", "Dark Mode"]
date: "2026-03-15"
---

## Why Class-Based Dark Mode?

There are two ways to handle dark mode in TailwindCSS:

- **Media query** — respects the OS setting automatically
- **Class-based** — you control it with a `.dark` class on `<html>`

Class-based gives you a user-controlled toggle, which is the better experience for a portfolio site.

## Installation

```bash
pnpm add @nuxtjs/color-mode
```

Register the module and configure it to use no class suffix (so the class is just `.dark`, not `.dark-mode`):

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@nuxtjs/color-mode"],
  colorMode: {
    classSuffix: "",
    fallback: "light",
  },
});
```

## Custom TailwindCSS Variant

In TailwindCSS 4, define a custom `dark` variant that targets the `.dark` class on any ancestor:

```css
/* assets/css/main.css */
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));
```

Now `dark:text-gray-100` and similar utilities will work correctly.

## The Toggle Composable

```ts
// composables/useTheme.ts
export const useTheme = () => {
  const colorMode = useColorMode();

  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  const theme = useCookie("theme", {
    default: () => "light",
    expires,
  });

  const switchTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
    colorMode.preference = theme.value;
  };

  return { theme, switchTheme };
};
```

## The Toggle Button

```vue
<script setup lang="ts">
import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline";

const { theme, switchTheme } = useTheme();
</script>

<template>
  <button @click="switchTheme" aria-label="Toggle theme">
    <SunIcon v-if="theme.value === 'dark'" class="w-5 h-5" />
    <MoonIcon v-else class="w-5 h-5" />
  </button>
</template>
```

## Persisting Across Sessions

The `useCookie` call in the composable handles persistence. On every page load, the cookie is read and `colorMode.preference` is set accordingly.

> **Note:** The cookie is set to expire in 1 year, so users won't need to re-toggle their preference on every visit.

## Verifying It Works

Open your browser DevTools and inspect the `<html>` element. When you click the toggle, you should see the `dark` class being added and removed.

```js
// DevTools Console — check current mode
document.documentElement.classList.contains("dark"); // true or false
```

That's all it takes to get a fully persistent, class-based dark mode working in Nuxt 4.
