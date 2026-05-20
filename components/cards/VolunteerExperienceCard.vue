<script setup lang="ts">
import type { Volunteer } from '@/models/experience/volunteer';

interface Props {
  volunteer: Volunteer;
}

const { volunteer } = defineProps<Props>();
</script>

<template>
  <Card class="transition-colors hover:border-primary hover:bg-primary-tint active:border-primary active:bg-primary">
    <div class="flex flex-col gap-4 sm:flex-row">
      <div class="shrink-0 self-start">
        <img src="https://placehold.co/100x100" :alt="volunteer.organization" :title="volunteer.organization"
          class="w-20 h-20 rounded-lg">
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <h2 class="text-gray-900 text-xl font-medium text-left dark:text-gray-100">{{ volunteer.title }}</h2>
          <h3 class="text-gray-900 text-left dark:text-gray-100">{{ volunteer.organization }}</h3>
          <TimeRange :start="volunteer.start" :end="volunteer.end" :current="volunteer.current" />
        </div>

        <div class="">
          <p class="text-gray-900 text-left dark:text-gray-100">{{ volunteer.description }}</p>
        </div>
      </div>
    </div>
  </Card>
</template>