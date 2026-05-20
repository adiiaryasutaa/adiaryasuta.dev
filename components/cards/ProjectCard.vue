<script setup lang="ts">
import { GlobeAltIcon } from "@heroicons/vue/24/outline";
import type { Project } from "@/models/project";

interface Props {
  project: Project;
}

const { project } = defineProps<Props>();
</script>

<template>
  <Card
    class="hover:border-primary hover:bg-primary-tint active:border-primary active:bg-primary transition-colors"
  >
    <div class="flex flex-col gap-4 md:flex-row">
      <div class="w-full shrink-0 md:w-48">
        <img
          :src="project.cover ?? '/assets/imgs/projects/no-image.png'"
          :alt="project.name"
          class="h-48 w-full rounded-lg border border-gray-400 object-cover dark:border-gray-600"
        />
      </div>
      <div class="flex grow flex-col gap-3">
        <div class="flex flex-col gap-1">
          <h1 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {{ project.name }}
          </h1>
          <p class="leading-relaxed text-gray-600 dark:text-gray-400">
            {{ project.description }}
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in project.tags"
            class="rounded-lg border border-gray-400 bg-gray-100 px-2 py-1 text-sm font-medium dark:border-gray-600 dark:bg-gray-900 dark:text-gray-400"
          >
            {{ tag.name }}
          </span>
        </div>
        <div v-if="project.preview || project.repository" class="flex items-center gap-1">
          <a
            v-if="project.preview"
            :href="project.preview.url"
            target="_blank"
            class="p-1.5 text-gray-700 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200"
          >
            <GlobeAltIcon class="h-5 w-5" />
          </a>
          <a
            v-if="project.repository"
            :href="project.repository.url"
            target="_blank"
            class="p-1.5 text-gray-700 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200"
          >
            <GithubIcon class="h-4 w-4 stroke-2" />
          </a>
        </div>
      </div>
    </div>
  </Card>
</template>
