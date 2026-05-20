<script setup lang="ts">
const route = useRoute();
const { user, clear } = useUserSession();
const cfg = useRuntimeConfig();
const slug = cfg.public.adminSlug;

const nav = [
  { label: "Dashboard", to: `/${slug}`, icon: "🏠" },
  { label: "Projects", to: `/${slug}/projects`, icon: "🗂️" },
  { label: "Skills", to: `/${slug}/skills`, icon: "⚡" },
  { label: "Tech", to: `/${slug}/tech`, icon: "🔧" },
  { label: "Tools", to: `/${slug}/tools`, icon: "🛠️" },
  { label: "Experiences", to: `/${slug}/experiences`, icon: "💼" },
  { label: "Friends", to: `/${slug}/friends`, icon: "👥" },
  { label: "Blog", to: `/${slug}/blog`, icon: "📝" },
  { label: "SEO", to: `/${slug}/seo`, icon: "🔍" },
  { label: "i18n", to: `/${slug}/i18n`, icon: "🌐" },
];

async function logout() {
  await $fetch("/auth/logout", { method: "POST" });
  await clear();
  navigateTo("/");
}

const sidebarOpen = ref(false);
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Top bar -->
    <header
      class="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-900"
    >
      <div class="flex items-center gap-3">
        <button
          class="rounded p-1 text-gray-500 hover:bg-gray-100 lg:hidden dark:hover:bg-gray-800"
          @click="sidebarOpen = !sidebarOpen"
        >
          ☰
        </button>
        <span class="font-semibold text-gray-900 dark:text-gray-100">Admin Panel</span>
      </div>
      <div class="flex items-center gap-3">
        <img
          v-if="user?.avatar"
          :src="user.avatar"
          :alt="user.login"
          class="h-8 w-8 rounded-full"
        />
        <span class="text-sm text-gray-600 dark:text-gray-400">{{ user?.login }}</span>
        <button
          class="rounded px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </header>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-20 w-56 transform border-r border-gray-200 bg-white pt-14 transition-transform dark:border-gray-800 dark:bg-gray-900',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <nav class="flex flex-col gap-0.5 p-3">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          :class="{
            'bg-primary/10 text-primary dark:text-primary font-medium':
              route.path === item.to || (item.to !== `/${slug}` && route.path.startsWith(item.to)),
          }"
        >
          <span>{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </NuxtLink>
      </nav>
    </aside>

    <!-- Overlay for mobile -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-10 bg-black/30 lg:hidden"
      @click="sidebarOpen = false"
    />

    <!-- Main content -->
    <main class="pt-14 lg:pl-56">
      <div class="p-6">
        <slot />
      </div>
    </main>
  </div>
</template>
