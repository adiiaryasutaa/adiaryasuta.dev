<script setup lang="ts">
import Card from "@/components/cards/Card.vue";
import Paragraph from "@/components/Paragraph.vue";
import type { Work } from "@/models/experience/work";

interface Props {
  work: Work;
}

const { work } = defineProps<Props>();
</script>

<template>
  <Card>
    <div class="flex flex-col gap-4 sm:flex-row">
      <div class="shrink-0 self-start">
        <img
          src="https://placehold.co/100x100"
          :alt="work.company"
          :title="work.company"
          class="w-20 h-20 rounded-lg"
        />
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <h2
            class="text-gray-900 text-xl font-medium text-left dark:text-gray-100"
          >
            {{ work.title }}
          </h2>
          <h3 class="text-gray-900 text-left dark:text-gray-100">
            {{ work.company }}
          </h3>
          <div class="flex flex-col sm:flex-row sm:items-center">
            <p
              class="text-gray-900 text-sm text-left sm:after:content-['·'] sm:after:mx-2 dark:text-gray-100"
            >
              {{ `${work.start.month} ${work.start.year}` }} -
              {{
                work.current
                  ? "Present"
                  : `${work.end?.month}
              ${work.end?.year}`
              }}
            </p>
            <p class="text-gray-900 text-sm text-left dark:text-gray-100">
              {{ work.employment }}
            </p>
          </div>
        </div>

        <div>
          <Paragraph>{{ work.description }}</Paragraph>
        </div>
      </div>
    </div>
  </Card>
</template>
