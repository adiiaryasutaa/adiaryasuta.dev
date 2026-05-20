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
  <NuxtLink :to="post.path" class="group block">
    <Card
      class="group-hover:border-primary group-hover:bg-primary-tint group-active:border-primary group-active:bg-primary transition-colors"
    >
      <div class="flex flex-col gap-4 md:flex-row">
        <div class="shrink-0 md:w-56">
          <img
            v-if="post.cover"
            :src="post.cover"
            :alt="post.title"
            class="h-48 w-full rounded-lg border border-gray-400 object-cover md:h-full dark:border-gray-600"
          />
          <div
            v-else
            class="h-48 w-full rounded-lg border border-gray-400 bg-gray-200 md:h-full dark:border-gray-600 dark:bg-gray-800"
          />
        </div>

        <div class="flex grow flex-col gap-3">
          <div class="flex flex-col gap-1">
            <h2
              class="group-hover:text-primary text-xl font-semibold text-gray-900 transition-colors dark:text-gray-100"
            >
              {{ post.title }}
            </h2>
            <p class="leading-relaxed text-gray-600 dark:text-gray-400">
              {{ post.description }}
            </p>
          </div>

          <TagList :tags="post.tags" />

          <p class="mt-auto text-sm text-gray-500 dark:text-gray-500">
            {{ formattedDate }}
          </p>
        </div>
      </div>
    </Card>
  </NuxtLink>
</template>
