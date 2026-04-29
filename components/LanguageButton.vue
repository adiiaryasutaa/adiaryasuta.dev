<script setup lang="ts">
import { LanguageIcon } from "@heroicons/vue/20/solid";

const { locale, switchLocale } = useLocale();
</script>

<template>
  <button
    @click="switchLocale"
    class="p-2 rounded-lg text-gray-500 border-2 border-gray-400 bg-gray-200 hover:text-gray-600 hover:bg-gray-300 hover:cursor-pointer dark:text-gray-500 dark:border-gray-600 dark:bg-gray-950 dark:hover:text-gray-400 dark:hover:bg-gray-900"
  >
    <div class="flex justify-start items-center">
      <LanguageIcon class="w-5 h-5" />
      <span
        class="grow text-xs px-1 py-0.5 bg-gray-100 border border-gray-400 rounded-lg ml-1 dark:bg-gray-900 dark:border-gray-600"
      >
        {{ locale }}
      </span>
    </div>
  </button>
</template>
