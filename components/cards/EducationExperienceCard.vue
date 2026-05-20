<script setup lang="ts">
import type { Education } from "~/models/experience/education";

interface Props {
  education: Education;
}

const { education } = defineProps<Props>();
</script>

<template>
  <Card
    class="hover:border-primary hover:bg-primary-tint active:border-primary active:bg-primary transition-colors"
  >
    <div class="flex flex-col gap-4 sm:flex-row">
      <div class="shrink-0 self-start">
        <img
          src="https://placehold.co/100x100"
          :alt="education.school"
          :title="education.school"
          class="h-20 w-20 rounded-lg"
        />
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <h2 class="text-left text-xl font-medium text-gray-900 dark:text-gray-100">
            {{ education.school }}
          </h2>
          <h3 class="text-left text-gray-900 dark:text-gray-100">{{ education.major }}</h3>
          <div class="flex flex-row">
            <p class="text-left text-sm text-gray-900 dark:text-gray-100">
              {{ education.start }} - {{ education.end }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>
