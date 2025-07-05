<script setup lang="ts">
import SocialMediaSection from "@/components/sections/SocialMediaSection.vue";
</script>

<template>
  <section class="container py-16">
    <div class="flex flex-col items-center">
      <div>
        <img src="@/assets/imgs/adiaryasuta.jpg" alt="Adi Aryasuta"
             class="rounded-full w-40 ring-8 ring-slate-200 dark:ring-slate-700">
      </div>
      <div class="flex flex-col items-center mt-8">
        <h1 class="text-3xl text-slate-800 font-medium dark:text-slate-100">{{ $t('brand') }}</h1>
        <p v-html="$t('home.description')"
           class="text-sm text-slate-600 text-center leading-relaxed mt-4 md:text-base dark:text-slate-300"></p>

        <SocialMediaSection/>

        <NuxtLink to="/about"
                     class="px-4 py-2 text-sm font-medium border border-slate-300 rounded-sm mt-8 hover:bg-slate-100 active:bg-slate-200 focus:ring-2 focus:ring-slate-200 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-800 dark:active:bg-slate-700 dark:focus:ring-slate-700">
          {{ $t('home.see-more') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>