<script setup lang="ts">
import type { Skill } from "@/models/skill";

interface Props {
  skill: Skill;
  highlight?: boolean;
}

const { skill, highlight } = defineProps<Props>();
</script>

<template>
  <Card
    class="hover:border-primary hover:bg-primary-tint active:border-primary active:bg-primary transition-colors"
  >
    <img :src="skill.logo" :alt="skill.name" class="rounded-lg" />
    <h4 class="mt-2 text-center font-medium text-gray-900 capitalize dark:text-gray-100">
      {{ skill.name }}
    </h4>
  </Card>
</template>
