<script setup lang="ts">
import Card from "@/components/cards/Card.vue";
import type { Tool } from "@/models/tool";

interface Props {
  tool: Tool;
}

const { tool } = defineProps<Props>();
</script>

<template>
  <Card>
    <img :src="tool.logo" :alt="tool.name" class="rounded-lg">
    <h4 class="text-gray-900 font-medium text-center capitalize mt-2 dark:text-gray-100">{{ tool.name }}</h4>
  </Card>
</template>