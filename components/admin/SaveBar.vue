<script setup lang="ts">
defineProps<{
  isDirty: boolean;
  loading?: boolean;
  saved?: boolean;
}>();

defineEmits<{
  save: [];
  discard: [];
}>();
</script>

<template>
  <Transition name="savebar">
    <div
      v-if="isDirty || saved"
      class="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-gray-200 bg-white px-6 py-3 shadow-lg dark:border-gray-800 dark:bg-gray-900"
    >
      <span v-if="saved" class="text-sm text-green-600 dark:text-green-400">
        ✓ Saved — site will redeploy in ~30s
      </span>
      <span v-else class="text-sm text-gray-500 dark:text-gray-400"> Unsaved changes </span>

      <div class="flex gap-3">
        <button
          v-if="isDirty"
          :disabled="loading"
          class="rounded-md px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 dark:text-gray-400 dark:hover:bg-gray-800"
          @click="$emit('discard')"
        >
          Discard
        </button>
        <button
          v-if="isDirty"
          :disabled="loading"
          class="bg-primary hover:bg-primary/90 rounded-md px-4 py-1.5 text-sm font-medium text-white disabled:opacity-50"
          @click="$emit('save')"
        >
          {{ loading ? "Saving…" : "Save" }}
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.savebar-enter-active,
.savebar-leave-active {
  transition: translate 200ms ease;
}
.savebar-enter-from,
.savebar-leave-to {
  translate: 0 100%;
}
</style>
