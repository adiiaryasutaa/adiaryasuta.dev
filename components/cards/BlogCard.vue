<script setup lang="ts">
interface Props {
  post: {
    title: string;
    description: string;
    cover?: string;
    tags: string[];
    date: string;
    path: string;
  };
}

const { post } = defineProps<Props>();

const formattedDate = computed(() =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.date))
);
</script>

<template>
  <NuxtLink :to="post.path" class="block group">
    <Card class="transition-colors group-hover:border-primary group-hover:bg-primary-tint group-active:border-primary group-active:bg-primary">
      <div class="flex flex-col gap-4 md:flex-row">
        <div class="shrink-0 md:w-56">
          <img
            v-if="post.cover"
            :src="post.cover"
            :alt="post.title"
            class="w-full h-48 md:h-full rounded-lg object-cover border border-gray-400 dark:border-gray-600"
          />
          <div
            v-else
            class="w-full h-48 md:h-full rounded-lg bg-gray-200 border border-gray-400 dark:bg-gray-800 dark:border-gray-600"
          />
        </div>

        <div class="flex flex-col gap-3 grow">
          <div class="flex flex-col gap-1">
            <h2 class="font-semibold text-gray-900 text-xl dark:text-gray-100 group-hover:text-primary transition-colors">
              {{ post.title }}
            </h2>
            <p class="text-gray-600 leading-relaxed dark:text-gray-400">
              {{ post.description }}
            </p>
          </div>

          <TagList :tags="post.tags" />

          <p class="text-sm text-gray-500 dark:text-gray-500 mt-auto">
            {{ formattedDate }}
          </p>
        </div>
      </div>
    </Card>
  </NuxtLink>
</template>
