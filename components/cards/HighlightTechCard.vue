<script setup lang="ts">
import type { Tech } from "@/models/tech";

interface Props {
  tech: Tech;
}

const { tech } = defineProps<Props>();
</script>

<template>
  <Card
    class="hover:border-primary hover:bg-primary-tint active:border-primary active:bg-primary transition-colors"
  >
    <div class="flex flex-col gap-4 sm:flex-row">
      <div class="shrink-0 self-start">
        <img :src="tech.logo" :alt="tech.name" class="h-20 w-20 rounded-lg" />
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <h2 class="text-left text-xl font-medium text-gray-900 dark:text-gray-100">
            {{ tech.name }}
          </h2>
          <p class="text-left text-gray-900 dark:text-gray-100">{{ tech.description }}</p>
        </div>
      </div>
    </div>
  </Card>
</template>
