<script setup lang="ts">
definePageMeta({ middleware: "admin", layout: false });

const { data, loading, saved, isDirty, load, save, discard } = useAdminResource<{ data: any[] }>(
  "tool"
);

onMounted(load);

function addTool() {
  data.value?.data.push({ logo: "", name: "" });
}

function removeTool(i: number) {
  data.value?.data.splice(i, 1);
}
</script>

<template>
  <AdminShell>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-xl font-bold text-gray-900 dark:text-gray-100">Tools</h1>
      <button
        class="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium text-white"
        @click="addTool"
      >
        + Add Tool
      </button>
    </div>

    <div v-if="loading && !data" class="py-12 text-center text-gray-400">Loading…</div>

    <div v-else-if="data" class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(tool, i) in data.data"
        :key="i"
        class="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
      >
        <img v-if="tool.logo" :src="tool.logo" class="h-8 w-8 flex-shrink-0 object-contain" />
        <div class="flex min-w-0 flex-1 flex-col gap-2">
          <input
            v-model="tool.name"
            placeholder="Name"
            class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
          <input
            v-model="tool.logo"
            placeholder="Logo URL"
            class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
        <button class="flex-shrink-0 text-red-400 hover:text-red-600" @click="removeTool(i)">
          ×
        </button>
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
