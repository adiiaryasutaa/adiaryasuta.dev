<script setup lang="ts">
definePageMeta({ middleware: "admin", layout: false });

const route = useRoute();
const cfg = useRuntimeConfig();
const adminSlug = cfg.public.adminSlug;

const postSlug = route.params.slug as string;
const isNew = postSlug === "new";

// Frontmatter fields
const title = ref("");
const description = ref("");
const date = ref(new Date().toISOString().split("T")[0]);
const tags = ref<string[]>([]);
const cover = ref("");
const body = ref("## Start writing here\n");

const sha = ref<string | undefined>(undefined);
const loading = ref(false);
const saving = ref(false);
const saved = ref(false);
const newSlug = ref(isNew ? "" : postSlug);

function buildMarkdown() {
  const fm = [
    "---",
    `title: "${title.value}"`,
    `description: "${description.value}"`,
    `date: ${date.value}`,
    `tags: [${tags.value.map((t) => `"${t}"`).join(", ")}]`,
    cover.value ? `cover: "${cover.value}"` : null,
    "---",
    "",
  ]
    .filter((l) => l !== null)
    .join("\n");
  return fm + body.value;
}

function parseMarkdown(raw: string) {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch?.[1] || !fmMatch?.[2]) {
    body.value = raw;
    return;
  }
  const fm = fmMatch[1];
  body.value = fmMatch[2].trimStart();
  const get = (key: string) => fm.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]?.trim() ?? "";
  title.value = get("title").replace(/^"|"$/g, "");
  description.value = get("description").replace(/^"|"$/g, "");
  date.value = get("date");
  cover.value = get("cover").replace(/^"|"$/g, "");
  const tagsMatch = fm.match(/^tags:\s*\[([^\]]*)\]/m);
  tags.value = tagsMatch?.[1]
    ? tagsMatch[1]
        .split(",")
        .map((t) => t.trim().replace(/^"|"$/g, ""))
        .filter(Boolean)
    : [];
}

if (!isNew) {
  loading.value = true;
  const res = await $fetch<{ content: string; sha: string }>(`/api/admin/blog/${postSlug}`);
  sha.value = res.sha;
  parseMarkdown(res.content);
  loading.value = false;
}

async function save() {
  const slug = isNew ? newSlug.value.trim() : postSlug;
  if (!slug) return alert("Enter a slug first.");
  saving.value = true;
  saved.value = false;
  try {
    await $fetch(`/api/admin/blog/${slug}`, {
      method: "PUT",
      body: { content: buildMarkdown(), sha: sha.value, isNew },
    });
    saved.value = true;
    setTimeout(() => (saved.value = false), 5000);
    if (isNew) navigateTo(`/${adminSlug}/blog/${slug}`);
  } finally {
    saving.value = false;
  }
}

function addTag() {
  tags.value.push("");
}
function removeTag(i: number) {
  tags.value.splice(i, 1);
}
</script>

<template>
  <AdminShell>
    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <NuxtLink :to="`/${adminSlug}/blog`" class="text-sm text-gray-400 hover:text-gray-600"
          >← Blog</NuxtLink
        >
        <h1 class="text-xl font-bold text-gray-900 dark:text-gray-100">
          {{ isNew ? "New Post" : postSlug }}
        </h1>
      </div>
      <button
        :disabled="saving"
        class="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        @click="save"
      >
        {{ saving ? "Saving…" : "Save" }}
      </button>
    </div>

    <div
      v-if="saved"
      class="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400"
    >
      ✓ Saved — site will redeploy in ~30s
    </div>

    <!-- Frontmatter form -->
    <div
      class="mb-6 grid gap-4 rounded-xl border border-gray-200 bg-white p-5 sm:grid-cols-2 dark:border-gray-800 dark:bg-gray-900"
    >
      <div v-if="isNew" class="sm:col-span-2">
        <label class="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
          >Slug (filename, no spaces)</label
        >
        <input
          v-model="newSlug"
          placeholder="my-new-post"
          class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>
      <div>
        <label class="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Title</label>
        <input
          v-model="title"
          class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>
      <div>
        <label class="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Date</label>
        <input
          v-model="date"
          type="date"
          class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>
      <div class="sm:col-span-2">
        <label class="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
          >Description</label
        >
        <input
          v-model="description"
          class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>
      <div>
        <label class="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
          >Cover image URL</label
        >
        <input
          v-model="cover"
          class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>
      <div>
        <label
          class="mb-1 flex items-center justify-between text-xs font-medium text-gray-600 dark:text-gray-400"
        >
          Tags
          <button class="text-primary hover:underline" @click="addTag">+ Add</button>
        </label>
        <div class="flex flex-wrap gap-2">
          <input
            v-for="(tag, ti) in tags"
            :key="ti"
            v-model="tags[ti]"
            class="w-24 rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
          <button
            v-if="tags.length"
            class="text-sm text-red-400"
            @click="removeTag(tags.length - 1)"
          >
            × Last
          </button>
        </div>
      </div>
    </div>

    <!-- Two-pane editor -->
    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <label class="mb-2 block text-xs font-medium text-gray-600 dark:text-gray-400"
          >Markdown</label
        >
        <textarea
          v-model="body"
          class="h-[60vh] w-full rounded-xl border border-gray-200 bg-white px-4 py-3 font-mono text-sm leading-relaxed dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100"
        />
      </div>
      <div>
        <label class="mb-2 block text-xs font-medium text-gray-600 dark:text-gray-400"
          >Preview</label
        >
        <div
          class="prose prose-gray prose-headings:font-semibold dark:prose-invert h-[60vh] max-w-none overflow-y-auto rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900"
        >
          <p class="text-sm text-gray-400 italic">
            Preview requires server-rendering. Save to see the rendered post.
          </p>
        </div>
      </div>
    </div>
  </AdminShell>
</template>
