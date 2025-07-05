<script setup lang="ts">
import Card from "~/components/cards/Card.vue";
import type { Skill } from "@/models/skill";

defineProps<{skill: Skill}>();
</script>

<template>
  <Card>
    <img :src="skill.logo" :alt="skill.name" class="rounded-sm">
    <h4 class="text-slate-900 font-medium text-center capitalize mt-2 dark:text-slate-100">{{ skill.name }}</h4>
  </Card>
</template>