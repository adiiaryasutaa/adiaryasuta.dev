<script setup lang="ts">
interface SocialLink {
  platform: 'github' | 'linkedin' | 'instagram' | 'twitter';
  url: string;
}

withDefaults(defineProps<{
  links: SocialLink[];
  size?: 'sm' | 'md';
}>(), { size: 'md' });
</script>

<template>
  <div class="flex items-center gap-1 -ml-1.5">
    <a
      v-for="link in links"
      :key="link.platform"
      :href="link.url"
      target="_blank"
      rel="noopener noreferrer"
      class="rounded-lg text-gray-600 hover:text-primary active:text-primary dark:text-gray-400 dark:hover:text-primary dark:active:text-primary"
      :class="size === 'sm' ? 'p-1.5' : 'p-2'"
    >
      <GithubIcon v-if="link.platform === 'github'" :class="size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'" />
      <LinkedInIcon v-else-if="link.platform === 'linkedin'" :class="size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'" />
      <InstagramIcon v-else-if="link.platform === 'instagram'" :class="size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'" />
      <TwitterIcon v-else-if="link.platform === 'twitter'" :class="size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'" />
    </a>
  </div>
</template>
