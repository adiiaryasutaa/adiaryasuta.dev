<script setup lang="ts">
import Card from '~/components/cards/Card.vue';
import type { Education } from '~/models/experience/education';

interface Props {
  education: Education;
}

const { education } = defineProps<Props>();
</script>

<template>
  <Card>
    <div class="flex flex-col gap-4 sm:flex-row">
      <div class="shrink-0 self-start">
        <img src="https://placehold.co/100x100" :alt="education.school" :title="education.school"
          class="w-20 h-20 rounded-lg">
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <h2 class="text-gray-900 text-xl font-medium text-left dark:text-gray-100">{{ education.school }}</h2>
          <h3 class="text-gray-900 text-left dark:text-gray-100">{{ education.major }}</h3>
          <div class="flex flex-row">
            <p class="text-gray-900 text-sm text-left dark:text-gray-100">
              {{ education.start }} - {{ education.end }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>