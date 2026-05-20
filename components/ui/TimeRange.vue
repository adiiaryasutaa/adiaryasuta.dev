<script setup lang="ts">
interface Period { month: string; year: number }

defineProps<{
  start: Period;
  end?: Period;
  current?: boolean;
}>();
</script>

<template>
  <p class="text-gray-900 text-sm text-left dark:text-gray-100">
    {{ `${start.month} ${start.year}` }} –
    {{ current ? $t('common.present') : end ? `${end.month} ${end.year}` : '' }}
  </p>
</template>
