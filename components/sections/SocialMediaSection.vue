<script setup lang="ts">
import LinkedInIcon from "@/components/icons/LinkedInIcon.vue";
import InstagramIcon from "@/components/icons/InstagramIcon.vue";
import TwitterIcon from "@/components/icons/TwitterIcon.vue";
import GithubIcon from "@/components/icons/GithubIcon.vue";
</script>

<template>
  <div class="flex justify-center space-x-4 mt-4">
    <a
        class="text-slate-600 rounded-sm p-2 hover:text-slate-700 active:text-slate-800 dark:text-slate-500 dark:hover:text-slate-400 dark:active:text-slate-300"
        href="https://github.com/adiiaryasutaa"
        target="_blank"
        rel="noopener noreferrer"
    >
      <GithubIcon class="w-5 h-5"/>
    </a>
    <a
        class="text-slate-600 rounded-sm p-2 hover:text-slate-700 active:text-slate-800 dark:text-slate-500 dark:hover:text-slate-400 dark:active:text-slate-300"
        href="https://www.linkedin.com/in/i-gusti-ngurah-agung-adi-aryasuta-32870723b"
        target="_blank"
        rel="noopener noreferrer"
    >
      <LinkedInIcon class="w-5 h-5"/>
    </a>
    <a
        class="text-slate-600 rounded-sm p-2 hover:text-slate-700 active:text-slate-800 dark:text-slate-500 dark:hover:text-slate-400 dark:active:text-slate-300"
        href="https://instagram.com/adiiaryasutaa"
        target="_blank"
        rel="noopener noreferrer"
    >
      <InstagramIcon class="w-5 h-5"/>
    </a>
    <a
        class="text-slate-600 rounded-sm p-2 hover:text-slate-700 active:text-slate-800 dark:text-slate-500 dark:hover:text-slate-400 dark:active:text-slate-300"
        href="https://twitter.com/lolcecep"
        target="_blank"
        rel="noopener noreferrer"
    >
      <TwitterIcon class="w-5 h-5"/>
    </a>
  </div>
</template>