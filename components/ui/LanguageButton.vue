<script setup lang="ts">
import { LanguageIcon } from "@heroicons/vue/20/solid";

const { locale, switchLocale } = useLocale();
</script>

<template>
  <button
    @click="switchLocale"
    class="hover:text-primary hover:border-primary dark:hover:text-primary dark:hover:border-primary rounded-lg border border-gray-400 bg-gray-200 p-2 text-gray-500 hover:cursor-pointer hover:bg-gray-300 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-500 dark:hover:bg-gray-900"
  >
    <div class="flex items-center justify-start">
      <LanguageIcon class="h-5 w-5" />
      <span
        class="ml-1 grow rounded-lg border border-gray-400 bg-gray-100 px-1 py-0.5 text-xs dark:border-gray-600 dark:bg-gray-900"
      >
        {{ locale }}
      </span>
    </div>
  </button>
</template>
