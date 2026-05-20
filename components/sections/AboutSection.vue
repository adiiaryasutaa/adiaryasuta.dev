<script setup lang="ts">
</script>

<template>
  <section class="container">
    <div class="flex flex-col md:flex-row md:items-start">
      <div class="flex flex-col md:shrink-0">
        <img
          src="/assets/images/adiaryasuta.jpg"
          :alt="$t('brand')"
          class="rounded-lg w-60 h-60 border border-gray-400 xl:w-72 xl:h-72 object-cover dark:border-gray-600"
        />
      </div>
      <div
        class="mt-10 text-gray-700 space-y-4 md:mt-0 md:ml-10 dark:text-gray-300"
      >
        <Paragraph v-html="$t('about.description[0]')"></Paragraph>
        <Paragraph v-html="$t('about.description[1]')"></Paragraph>
        <Paragraph v-html="$t('about.description[2]')"></Paragraph>
      </div>
    </div>
  </section>
</template>
