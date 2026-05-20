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
  partial: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();
const localePath = useLocalePath();
const isPartialActive = computed(
  () => prop.partial && !!prop.to && route.path.startsWith(localePath(prop.to))
);
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
    :to="localePath(prop.to)"
    class="block font-medium rounded-lg py-2 px-4"
    :class="isPartialActive ? 'partial-active text-primary' : ''"
    active-class="router-link-active text-primary"
    exact-active-class="router-link-exact-active text-primary"
  >
    {{ prop.label }}
  </NuxtLink>
</template>
