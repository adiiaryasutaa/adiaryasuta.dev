<script setup lang="ts">
import { MoonIcon, SunIcon } from "@heroicons/vue/20/solid";

const { theme, switchTheme } = useTheme();

onMounted(() => {
  if (theme.value === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});
</script>

<template>
  <button
    @click="switchTheme"
    class="p-2 rounded-lg text-gray-500 border-2 border-gray-400 bg-gray-200 hover:text-gray-600 hover:bg-gray-300 hover:cursor-pointer dark:text-gray-500 dark:border-gray-600 dark:bg-gray-950 dark:hover:text-gray-400 dark:hover:bg-gray-900"
  >
    <SunIcon v-if="theme === 'dark'" class="w-5 h-5" />
    <MoonIcon v-else class="w-5 h-5" />
  </button>
</template>
