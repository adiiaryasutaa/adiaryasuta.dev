<script setup lang="ts">
import Card from "~/components/cards/Card.vue";
import type { Tool } from "~/models/tool";

defineProps<{ tool: Tool }>();
</script>

<template>
  <Card>
    <img :src="tool.logo" :alt="tool.name" class="rounded-sm">
    <h4 class="text-slate-900 font-medium text-center capitalize mt-2 dark:text-slate-100">{{ tool.name }}</h4>
  </Card>
</template>