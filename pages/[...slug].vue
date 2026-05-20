<script setup lang="ts">
useHeadSafe({
  title: "404 — Page Not Found",
});
</script>

<template>
  <MainSection>
    <div class="flex flex-col space-y-8">
      <div class="container flex flex-col items-center justify-center gap-6 text-center">
        <p class="text-8xl font-bold text-gray-200 select-none dark:text-gray-100">404</p>
        <div class="flex flex-col gap-2">
          <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Page not found</h1>
          <p class="text-gray-500 dark:text-gray-500">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center">
        <NuxtLink
          to="/"
          class="hover:text-primary hover:border-primary focus:ring-primary/30 dark:hover:text-primary dark:hover:border-primary rounded-lg border border-gray-400 px-4 py-2 text-sm font-medium hover:bg-gray-100 focus:ring-2 active:bg-gray-200 dark:border-gray-600 dark:text-gray-50 dark:hover:bg-gray-900 dark:active:bg-gray-800"
        >
          Back to home
        </NuxtLink>
      </div>
    </div>
  </MainSection>
</template>
