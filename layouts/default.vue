<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div
    class="bg-gray-200 overflow-hidden selection:bg-gray-300 dark:background-image-image-dark dark:bg-gray-950 dark:selection:bg-gray-700"
  >
    <div class="sm:container sm:mx-auto">
      <div
        class="flex flex-col min-h-screen bg-gray-50 sm:border-x border-gray-400 dark:bg-gray-900 dark:border-gray-600"
      >
        <Navbar />
        <div class="grow">
          <slot />
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>
