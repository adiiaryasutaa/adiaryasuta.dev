<script setup lang="ts">
interface Props {
  tech: { logo?: string; name: string };
}

const props = defineProps<Props>();
</script>

<template>
  <div
    class="flex flex-row gap-1.5 items-center rounded-md border border-gray-400 px-2 py-0.5 dark:border-gray-600"
  >
    <img
      v-if="props.tech.logo"
      :src="props.tech.logo"
      :alt="props.tech.name"
      :title="props.tech.name"
      class="w-4 h-4"
    />
    <span class="text-gray-900 text-xs font-medium dark:text-gray-100">{{
      props.tech.name
    }}</span>
  </div>
</template>
