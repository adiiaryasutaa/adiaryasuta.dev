<script setup lang="ts">
import { GlobeAltIcon } from "@heroicons/vue/24/outline";
import type { Project } from "@/models/project";

interface Props {
  project: Project;
}

const { project } = defineProps<Props>();
</script>

<template>
  <Card class="transition-colors hover:border-primary hover:bg-primary-tint active:border-primary active:bg-primary">
    <div class="flex flex-col gap-4 md:flex-row">
      <div class="shrink-0 w-full md:w-48">
        <img
          :src="project.cover ?? 'src/assets/imgs/projects/no-image.png'"
          :alt="project.name"
          class="w-full h-48 rounded-lg object-cover border border-gray-400 dark:border-gray-600"
        />
      </div>
      <div class="flex flex-col gap-3 grow">
        <div class="flex flex-col gap-1">
          <h1 class="font-semibold text-gray-900 text-xl dark:text-gray-100">
            {{ project.name }}
          </h1>
          <p class="text-gray-600 leading-relaxed dark:text-gray-400">
            {{ project.description }}
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in project.tags"
            class="text-sm font-medium px-2 py-1 bg-gray-100 border border-gray-400 rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-gray-400"
          >
            {{ tag.name }}
          </span>
        </div>
        <div
          v-if="project.preview || project.repository"
          class="flex items-center gap-1"
        >
          <a
            v-if="project.preview"
            :href="project.preview.url"
            target="_blank"
            class="p-1.5 text-gray-700 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200"
          >
            <GlobeAltIcon class="w-5 h-5" />
          </a>
          <a
            v-if="project.repository"
            :href="project.repository.url"
            target="_blank"
            class="p-1.5 text-gray-700 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200"
          >
            <GithubIcon class="w-4 h-4 stroke-2" />
          </a>
        </div>
      </div>
    </div>
  </Card>
</template>
