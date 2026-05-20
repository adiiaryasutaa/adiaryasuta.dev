<script setup lang="ts">
defineProps<{ tags: string[] }>();
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <TechChip v-for="tag in tags" :key="tag" :tech="{ name: tag }" />
  </div>
</template>
