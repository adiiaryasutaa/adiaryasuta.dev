<script setup lang="ts"></script>

<template>
  <div
    class="dark:background-image-image-dark bg-gray-200 selection:bg-gray-300 dark:bg-gray-950 dark:selection:bg-gray-700"
  >
    <div class="sm:container sm:mx-auto">
      <div
        class="flex min-h-screen flex-col border-gray-400 bg-gray-50 sm:border-x dark:border-gray-600 dark:bg-gray-900"
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
