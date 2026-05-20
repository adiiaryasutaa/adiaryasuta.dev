<script setup lang="ts">
interface Period {
  month: string;
  year: number;
}

defineProps<{
  start: Period;
  end?: Period;
  current?: boolean;
}>();
</script>

<template>
  <p class="text-left text-sm text-gray-900 dark:text-gray-100">
    {{ `${start.month} ${start.year}` }} –
    {{ current ? $t("common.present") : end ? `${end.month} ${end.year}` : "" }}
  </p>
</template>
