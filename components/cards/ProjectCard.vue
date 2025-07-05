<script setup lang="ts">
import { GlobeAltIcon } from '@heroicons/vue/24/outline';
import GithubIcon from '@/components/icons/GithubIcon.vue';
import type { Project } from "~/models/project";

defineProps<{ project: Project }>();
</script>

<template>
  <div
      class="flex flex-col bg-slate-50 border border-slate-200 rounded-sm h-full p-4 drop-shadow-xl shadow-slate-200/25 dark:bg-slate-800 dark:border-slate-700 dark:shadow-slate-700/25">
    <img :src="project.cover ?? 'src/assets/imgs/projects/no-image.png'" :alt="project.name"
         class="rounded-sm border border-slate-200 dark:border-slate-700">
    <div class="grow flex flex-col">
      <div class="grow flex flex-col items-center mt-4">
        <h1 class="font-semibold text-slate-900 text-xl dark:text-slate-100">{{ project.name }}</h1>
        <p class="text-center text-slate-600 mt-1 leading-relaxed dark:text-slate-300">{{ project.description }}</p>
      </div>
      <div class="flex flex-col">
        <div class="flex flex-wrap justify-center gap-2 mt-4">
					<span v-for="tag in project.tags"
                class="text-sm font-medium px-2 py-1.5 bg-slate-100 border-2 border-slate-200 rounded-sm dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100">
						{{ tag.name }}
					</span>
        </div>
        <div v-if="project.preview || project.repository" class="flex justify-center items-center space-x-2 mt-4">
          <a v-if="project.preview" :href="project.preview.url" target="_blank"
             class="p-2 text-slate-700 hover:text-slate-800 dark:text-slate-300 dark:hover:text-slate-200">
            <GlobeAltIcon class="w-6 h-6"/>
          </a>
          <a v-if="project.repository" :href="project.repository.url" target="_blank"
             class="p-2 text-slate-700 hover:text-slate-800 dark:text-slate-300 dark:hover:text-slate-200">
            <GithubIcon class="w-5 h-5 stroke-2"/>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>