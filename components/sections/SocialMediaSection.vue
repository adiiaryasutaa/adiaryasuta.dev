<script setup lang="ts">
import LinkedInIcon from "@/components/icons/LinkedInIcon.vue";
import InstagramIcon from "@/components/icons/InstagramIcon.vue";
import TwitterIcon from "@/components/icons/TwitterIcon.vue";
import GithubIcon from "@/components/icons/GithubIcon.vue";
</script>

<template>
  <div class="flex items-start space-x-4">
    <a class="text-gray-600 rounded-lg p-2 hover:text-gray-700 active:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 dark:active:text-gray-200"
      href="https://github.com/adiiaryasutaa" target="_blank" rel="noopener noreferrer">
      <GithubIcon class="w-5 h-5" />
    </a>
    <a class="text-gray-600 rounded-lg p-2 hover:text-gray-700 active:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 dark:active:text-gray-200"
      href="https://www.linkedin.com/in/i-gusti-ngurah-agung-adi-aryasuta-32870723b" target="_blank"
      rel="noopener noreferrer">
      <LinkedInIcon class="w-5 h-5" />
    </a>
    <a class="text-gray-600 rounded-lg p-2 hover:text-gray-700 active:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 dark:active:text-gray-200"
      href="https://instagram.com/adiiaryasutaa" target="_blank" rel="noopener noreferrer">
      <InstagramIcon class="w-5 h-5" />
    </a>
    <a class="text-gray-600 rounded-lg p-2 hover:text-gray-700 active:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 dark:active:text-gray-200"
      href="https://twitter.com/lolcecep" target="_blank" rel="noopener noreferrer">
      <TwitterIcon class="w-5 h-5" />
    </a>
  </div>
</template>