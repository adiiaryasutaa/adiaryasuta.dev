<script setup lang="ts">
definePageMeta({ middleware: "admin", layout: false });

const { user } = useUserSession();
const cfg = useRuntimeConfig();
const slug = cfg.public.adminSlug;

const sections = [
  { label: "Projects", to: `/${slug}/projects`, desc: "Edit portfolio projects" },
  { label: "Skills", to: `/${slug}/skills`, desc: "Manage skill categories" },
  { label: "Tech Stack", to: `/${slug}/tech`, desc: "Edit tech with categories" },
  { label: "Tools", to: `/${slug}/tools`, desc: "Tools you use daily" },
  { label: "Experiences", to: `/${slug}/experiences`, desc: "Work, education, volunteer" },
  { label: "Friends", to: `/${slug}/friends`, desc: "Friend list & socials" },
  { label: "Blog", to: `/${slug}/blog`, desc: "Write and manage posts" },
  { label: "SEO", to: `/${slug}/seo`, desc: "Site-wide SEO settings" },
  { label: "i18n", to: `/${slug}/i18n`, desc: "EN & ID translations" },
];
</script>

<template>
  <AdminShell>
    <h1 class="mb-1 text-2xl font-bold text-gray-900 dark:text-gray-100">
      Welcome, {{ user?.name ?? user?.login }}
    </h1>
    <p class="mb-8 text-sm text-gray-500 dark:text-gray-400">
      Changes commit to GitHub and trigger a Vercel redeploy (~30s).
    </p>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="s in sections"
        :key="s.to"
        :to="s.to"
        class="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
      >
        <p class="font-semibold text-gray-900 dark:text-gray-100">{{ s.label }}</p>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ s.desc }}</p>
      </NuxtLink>
    </div>
  </AdminShell>
</template>
