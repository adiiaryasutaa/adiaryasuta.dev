<script setup lang="ts">
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/20/solid";

const prop = defineProps({
  label: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: false,
  },
  external: {
    type: Boolean,
    required: false,
  },
});
</script>
⎿  
<template>
  <a
    v-if="external"
    :href="to"
    class="flex items-center font-medium rounded-lg py-2 px-4 md:py-2"
  >
    <span class="mr-2">{{ prop.label }}</span>
    <ArrowTopRightOnSquareIcon class="w-5 h-5" />
  </a>
  <NuxtLink
    v-else
    :to="prop.to"
    class="block font-medium rounded-lg py-2 px-4"
    active-class="router-link-active bg-gray-300 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
    exact-active-class="router-link-exact-active bg-gray-300 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
  >
    {{ prop.label }}
  </NuxtLink>
</template>
