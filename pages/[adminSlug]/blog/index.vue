<script setup lang="ts">
definePageMeta({ middleware: "admin", layout: false });

const cfg = useRuntimeConfig();
const slug = cfg.public.adminSlug;

const { data: posts, refresh } = await useAsyncData("admin-blog-list", () =>
  $fetch<{ name: string; sha: string; path: string }[]>("/api/admin/blog")
);

const deleting = ref<string | null>(null);

async function deletePost(name: string, sha: string) {
  if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
  const postSlug = name.replace(/\.md$/, "");
  deleting.value = name;
  try {
    await $fetch(`/api/admin/blog/${postSlug}`, { method: "DELETE", body: { sha } });
    await refresh();
  } finally {
    deleting.value = null;
  }
}

function slugFromName(name: string) {
  return name.replace(/\.md$/, "");
}
</script>

<template>
  <AdminShell>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-xl font-bold text-gray-900 dark:text-gray-100">Blog Posts</h1>
      <NuxtLink
        :to="`/${slug}/blog/new`"
        class="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium text-white"
      >
        + New Post
      </NuxtLink>
    </div>

    <div v-if="!posts?.length" class="py-12 text-center text-gray-400">No posts yet.</div>

    <div
      v-else
      class="flex flex-col divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-900"
    >
      <div
        v-for="post in posts"
        :key="post.name"
        class="flex items-center justify-between px-5 py-4"
      >
        <div>
          <p class="font-medium text-gray-900 dark:text-gray-100">{{ slugFromName(post.name) }}</p>
          <p class="text-xs text-gray-400">{{ post.path }}</p>
        </div>
        <div class="flex gap-3">
          <NuxtLink
            :to="`/${slug}/blog/${slugFromName(post.name)}`"
            class="text-sm text-blue-500 hover:underline"
          >
            Edit
          </NuxtLink>
          <button
            :disabled="deleting === post.name"
            class="text-sm text-red-500 hover:text-red-700 disabled:opacity-50"
            @click="deletePost(post.name, post.sha)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </AdminShell>
</template>
