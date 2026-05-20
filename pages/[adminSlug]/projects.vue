<script setup lang="ts">
definePageMeta({ middleware: "admin", layout: false });

const { data, sha, loading, saved, isDirty, load, save, discard } = useAdminResource<{
  projects: any[];
}>("project");

onMounted(load);

function addProject() {
  data.value?.projects.push({
    name: "",
    description: "",
    tags: [],
    repository: { provider: "github", url: "" },
    preview: { url: "" },
  });
}

function removeProject(i: number) {
  data.value?.projects.splice(i, 1);
}

function addTag(project: any) {
  project.tags.push("");
}

function removeTag(project: any, i: number) {
  project.tags.splice(i, 1);
}
</script>

<template>
  <AdminShell>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-xl font-bold text-gray-900 dark:text-gray-100">Projects</h1>
      <button
        class="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium text-white"
        @click="addProject"
      >
        + Add Project
      </button>
    </div>

    <div v-if="loading && !data" class="py-12 text-center text-gray-400">Loading…</div>

    <div v-else-if="data" class="flex flex-col gap-4">
      <div
        v-for="(project, i) in data.projects"
        :key="i"
        class="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
      >
        <div class="mb-4 flex items-center justify-between">
          <span class="text-sm font-medium text-gray-500 dark:text-gray-400"
            >Project #{{ i + 1 }}</span
          >
          <button class="text-sm text-red-500 hover:text-red-700" @click="removeProject(i)">
            Remove
          </button>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
              >Name</label
            >
            <input
              v-model="project.name"
              class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
          <div>
            <label class="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
              >Repository URL</label
            >
            <input
              v-model="project.repository.url"
              class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
          <div class="sm:col-span-2">
            <label class="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
              >Description</label
            >
            <textarea
              v-model="project.description"
              rows="2"
              class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
          <div>
            <label class="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
              >Preview URL</label
            >
            <input
              v-model="project.preview.url"
              class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
          <div>
            <label class="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
              >Cover image URL</label
            >
            <input
              v-model="project.cover"
              class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
          <div class="sm:col-span-2">
            <label class="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
              >Tags</label
            >
            <div class="flex flex-wrap gap-2">
              <input
                v-for="(tag, ti) in project.tags"
                :key="ti"
                v-model="project.tags[ti]"
                class="w-28 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
              <button
                class="rounded-lg border border-dashed border-gray-300 px-3 py-1.5 text-sm text-gray-400 hover:border-gray-400 dark:border-gray-700"
                @click="addTag(project)"
              >
                + Tag
              </button>
              <button
                v-if="project.tags.length"
                class="text-sm text-red-400"
                @click="removeTag(project, project.tags.length - 1)"
              >
                × Last
              </button>
            </div>
          </div>
        </div>
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
