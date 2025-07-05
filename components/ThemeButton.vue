<script setup lang="ts">
import { MoonIcon, SunIcon } from '@heroicons/vue/20/solid';

const { theme, switchTheme } = useTheme();

onMounted(() => {
  if (theme.value === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});
</script>

<template>
  <button @click="switchTheme"
          class="p-2 rounded-sm text-slate-500 hover:text-slate-600 hover:bg-slate-50 active:bg-slate-100 focus:text-slate-600 focus:ring-3 focus:ring-slate-200 dark:hover:text-slate-500 dark:hover:bg-slate-800 dark:focus:ring-slate-700">
    <SunIcon v-if="theme === 'dark'" class="w-5 h-5"/>
    <MoonIcon v-else class="w-5 h-5"/>
  </button>
</template>