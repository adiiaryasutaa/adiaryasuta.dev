<script setup lang="ts"></script>

<template>
  <footer>
    <div class="container flex flex-col py-8 text-gray-400 dark:text-gray-600">
      <div class="text-sm">{{ $t("footer.copyright", { year: new Date().getFullYear() }) }}</div>
    </div>
  </footer>
</template>
