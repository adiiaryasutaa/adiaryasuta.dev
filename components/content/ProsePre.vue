<script setup lang="ts">
import { ClipboardIcon, CheckIcon } from "@heroicons/vue/20/solid";

defineProps<{
  code?: string;
  language?: string;
  filename?: string;
  highlights?: number[];
  meta?: string;
}>();

const copied = ref(false);

const copy = async (code: string) => {
  await navigator.clipboard.writeText(code);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
};
</script>

<template>
  <div class="my-5 rounded-lg overflow-hidden border border-[#444c56]">
    <!-- Header bar -->
    <div class="flex items-center justify-between px-4 py-2 bg-[#1c2128] border-b border-[#444c56]">
      <span class="text-xs font-mono text-gray-400">
        {{ filename ?? language ?? 'code' }}
      </span>
      <button
        v-if="code"
        @click="copy(code)"
        :aria-label="copied ? 'Copied!' : 'Copy code'"
        class="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
      >
        <CheckIcon v-if="copied" class="w-3.5 h-3.5" />
        <ClipboardIcon v-else class="w-3.5 h-3.5" />
        <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
      </button>
    </div>
    <pre class="!my-0 !rounded-none !border-0"><slot /></pre>
  </div>
</template>
