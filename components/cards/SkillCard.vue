<script setup lang="ts">
import Card from "@/components/cards/Card.vue";
import type { Skill } from "@/models/skill";

interface Props {
  skill: Skill;
  highlight?: boolean;
}

const { skill, highlight } = defineProps<Props>();
</script>

<template>
  <Card>
    <img :src="skill.logo" :alt="skill.name" class="rounded-lg">
    <h4 class="text-gray-900 font-medium text-center capitalize mt-2 dark:text-gray-100">{{ skill.name }}</h4>
  </Card>
</template>