<script setup lang="ts">
interface Props {
  tech: { logo?: string; name: string };
}

const props = defineProps<Props>();
</script>

<template>
  <div
    class="flex flex-row items-center gap-1.5 rounded-md border border-gray-400 px-2 py-0.5 dark:border-gray-600"
  >
    <img
      v-if="props.tech.logo"
      :src="props.tech.logo"
      :alt="props.tech.name"
      :title="props.tech.name"
      class="h-4 w-4"
    />
    <span class="text-xs font-medium text-gray-900 dark:text-gray-100">{{ props.tech.name }}</span>
  </div>
</template>
