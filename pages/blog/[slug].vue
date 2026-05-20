<script setup lang="ts">
import { ArrowLeftIcon } from "@heroicons/vue/20/solid";

const route = useRoute();
const slug = route.params.slug as string;

const { data: post } = await useAsyncData(`blog-${slug}`, () =>
  queryCollection("blog").path(`/blog/${slug}`).first()
);

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: "Post not found" });
}

const { data: allPosts } = await useAsyncData("all-blogs-related", () =>
  queryCollection("blog").order("date", "DESC").all()
);

const relatedPosts = computed(() => {
  if (!allPosts.value || !post.value) return [];
  return allPosts.value
    .filter((p) => p.path !== post.value!.path)
    .filter((p) => p.tags.some((tag) => post.value!.tags.includes(tag)))
    .slice(0, 3);
});

function extractText(node: any): string {
  if (!node) return "";
  if (node.type === "text") return node.value || "";
  if (node.children) return node.children.map(extractText).join(" ");
  return "";
}

const readingTime = computed(() => {
  if (!post.value?.body) return 1;
  const text = extractText(post.value.body);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
});

const formattedDate = computed(() => {
  if (!post.value?.date) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.value.date));
});

const OG_IMAGE = "https://adiaryasuta.vercel.app/assets/imgs/adiaryasuta.jpg";

useSeoMeta({
  title: () => post.value?.title ?? "Blog",
  description: () => post.value?.description ?? "",
  ogTitle: () => post.value?.title ?? "Blog",
  ogDescription: () => post.value?.description ?? "",
  ogType: "article",
  ogUrl: () => `https://adiaryasuta.vercel.app/blog/${slug}`,
  ogImage: () => post.value?.cover ?? OG_IMAGE,
  articlePublishedTime: () => post.value?.date,
  articleTag: () => post.value?.tags,
  twitterCard: "summary_large_image",
  twitterTitle: () => post.value?.title ?? "Blog",
  twitterDescription: () => post.value?.description ?? "",
  twitterImage: () => post.value?.cover ?? OG_IMAGE,
});

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: computed(() =>
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.value?.title,
          description: post.value?.description,
          datePublished: post.value?.date,
          author: {
            "@type": "Person",
            name: "Adi Aryasuta",
            url: "https://adiaryasuta.vercel.app",
          },
          image: post.value?.cover ?? OG_IMAGE,
        })
      ),
    },
  ],
});
</script>

<template>
  <MainSection>
    <div class="container">
      <div class="mx-auto flex max-w-2xl flex-col gap-6">
        <!-- Back button -->
        <NuxtLink
          to="/blog"
          class="hover:text-primary active:text-primary dark:hover:text-primary dark:active:text-primary flex w-fit items-center gap-1.5 text-sm text-gray-500 transition-colors dark:text-gray-400"
        >
          <ArrowLeftIcon class="h-4 w-4 shrink-0" />
          <span>{{ $t("blog.back") }}</span>
        </NuxtLink>

        <template v-if="post">
          <!-- Cover image / placeholder -->
          <img
            v-if="post.cover"
            :src="post.cover"
            :alt="post.title"
            class="w-full rounded-lg border border-gray-400 object-cover dark:border-gray-600"
          />
          <div
            v-else
            class="h-64 w-full rounded-lg border border-gray-400 bg-gray-200 dark:border-gray-600 dark:bg-gray-800"
          />

          <!-- Title -->
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {{ post.title }}
          </h1>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5">
            <TechChip v-for="tag in post.tags" :key="tag" :tech="{ name: tag }" />
          </div>

          <!-- Date -->
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ formattedDate }}
          </p>

          <!-- Reading time -->
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ readingTime }} {{ $t("blog.min-read") }}
          </p>

          <hr class="border-gray-300 dark:border-gray-700" />

          <!-- Article body -->
          <div class="prose prose-gray prose-headings:font-semibold max-w-none">
            <ContentRenderer :value="post" />
          </div>

          <!-- Related posts -->
          <template v-if="relatedPosts.length">
            <hr class="border-gray-300 dark:border-gray-700" />
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {{ $t("blog.more-posts") }}
            </h2>
            <div class="flex flex-col gap-4">
              <BlogCard v-for="related in relatedPosts" :key="related.path" :post="related" />
            </div>
          </template>
        </template>
      </div>
    </div>
  </MainSection>
</template>
