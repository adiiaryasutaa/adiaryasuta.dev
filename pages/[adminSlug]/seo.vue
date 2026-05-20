<script setup lang="ts">
definePageMeta({ middleware: "admin", layout: false });

const { data, loading, saved, isDirty, load, save, discard } = useAdminResource<{
  siteName: string;
  siteUrl: string;
  defaultOgImage: string;
  themeColor: string;
  twitterHandle: string;
}>("seo", "/api/admin/seo");

onMounted(load);
</script>

<template>
  <AdminShell>
    <h1 class="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">SEO Settings</h1>
    <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
      Site-wide defaults for Open Graph, Twitter Card, and meta tags.
    </p>

    <div v-if="loading && !data" class="py-12 text-center text-gray-400">Loading…</div>

    <div
      v-else-if="data"
      class="grid max-w-2xl gap-5 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
    >
      <div>
        <label class="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
          >Site name</label
        >
        <input
          v-model="data.siteName"
          class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>
      <div>
        <label class="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
          >Site URL</label
        >
        <input
          v-model="data.siteUrl"
          class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>
      <div>
        <label class="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
          >Default OG image URL</label
        >
        <input
          v-model="data.defaultOgImage"
          class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
        <img
          v-if="data.defaultOgImage"
          :src="data.defaultOgImage"
          class="mt-2 h-20 w-20 rounded-lg object-cover"
        />
      </div>
      <div>
        <label class="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
          >Theme color</label
        >
        <div class="flex items-center gap-3">
          <input
            v-model="data.themeColor"
            type="color"
            class="h-10 w-16 cursor-pointer rounded border border-gray-200 bg-gray-50 p-1 dark:border-gray-700"
          />
          <input
            v-model="data.themeColor"
            class="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
      </div>
      <div>
        <label class="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
          >Twitter handle (without @)</label
        >
        <input
          v-model="data.twitterHandle"
          placeholder="adiiaryasutaa"
          class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>
    </div>

    <AdminSaveBar
      :is-dirty="isDirty"
      :loading="loading"
      :saved="saved"
      @save="save"
      @discard="discard"
    />
  </AdminShell>
</template>
