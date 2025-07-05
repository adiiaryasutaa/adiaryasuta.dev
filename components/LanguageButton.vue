<script setup lang="ts">
import { LanguageIcon } from '@heroicons/vue/20/solid';

const { locale, switchLocale } = useLocale();
</script>

<template>
  <button @click="switchLocale"
          class="p-2 rounded-sm text-slate-500 w-[4.1rem] hover:text-slate-600 hover:bg-slate-50 active:bg-slate-100 focus:text-slate-600 focus:ring-3 focus:ring-slate-200 md:text-lg dark:hover:text-slate-500 dark:hover:bg-slate-800 dark:focus:ring-slate-700">
    <div class="flex justify-start items-center">
      <LanguageIcon class="w-5 h-5"/>
      <span
          class="grow text-xs px-1 py-0.5 bg-slate-100 border border-slate-300 rounded-sm ml-1 dark:bg-slate-800 dark:border-slate-600">
        {{ locale }}
      </span>
    </div>
  </button>
</template>