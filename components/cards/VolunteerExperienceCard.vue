<script setup lang="ts">
import Card from '@/components/cards/Card.vue';
import type { Volunteer } from '@/models/experience/volunteer';

interface Props {
  volunteer: Volunteer;
}

const { volunteer } = defineProps<Props>();
</script>

<template>
  <Card>
    <div class="flex flex-col gap-4 sm:flex-row">
      <div class="shrink-0 self-start">
        <img src="https://placehold.co/100x100" :alt="volunteer.organization" :title="volunteer.organization"
          class="w-20 h-20 rounded-lg">
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <h2 class="text-gray-900 text-xl font-medium text-left dark:text-gray-100">{{ volunteer.title }}</h2>
          <h3 class="text-gray-900 text-left dark:text-gray-100">{{ volunteer.organization }}</h3>
          <div class="flex flex-row">
            <p class="text-gray-900 text-sm text-left dark:text-gray-100">
              {{ `${volunteer.start.month} ${volunteer.start.year}` }} - {{ volunteer.current ? 'Present' :
                `${volunteer.end?.month} ${volunteer.end?.year}` }}
            </p>
          </div>
        </div>

        <div class="">
          <p class="text-gray-900 text-left dark:text-gray-100">{{ volunteer.description }}</p>
        </div>
      </div>
    </div>
  </Card>
</template>