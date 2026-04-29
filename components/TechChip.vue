<script setup lang="ts">
import type { Tech } from "@/models/tech";

interface Props {
  tech: Tech;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    class="flex flex-row gap-2 items-center rounded-lg border-2 border-gray-400 px-4 p-2 dark:border-gray-600"
  >
    <img
      :src="props.tech.logo"
      :alt="props.tech.name"
      :title="props.tech.name"
      class="w-4 h-4"
    />
    <span class="text-gray-900 text-sm font-medium dark:text-gray-100">{{
      props.tech.name
    }}</span>
  </div>
</template>
