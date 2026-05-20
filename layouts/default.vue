<script setup lang="ts">
</script>

<template>
  <div
    class="bg-gray-200 selection:bg-gray-300 dark:background-image-image-dark dark:bg-gray-950 dark:selection:bg-gray-700"
  >
    <div class="sm:container sm:mx-auto">
      <div
        class="flex flex-col min-h-screen bg-gray-50 sm:border-x border-gray-400 dark:bg-gray-900 dark:border-gray-600"
      >
        <Navbar />
        <div class="grow overflow-hidden">
          <slot />
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>
