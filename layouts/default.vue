<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div
      class="bg-gray-100 bg-image-light overflow-hidden selection:bg-slate-300 dark:bg-gray-900 dark:bg-image-dark dark:selection:bg-slate-700">
    <div class="flex flex-col min-h-screen">
      <Navbar/>
      <div class="grow">
        <slot/>
      </div>
      <Footer/>
    </div>
  </div>
</template>