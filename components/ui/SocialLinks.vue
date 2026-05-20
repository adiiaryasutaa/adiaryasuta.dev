<script setup lang="ts">
interface SocialLink {
  platform: "github" | "linkedin" | "instagram" | "twitter";
  url: string;
}

withDefaults(
  defineProps<{
    links: SocialLink[];
    size?: "sm" | "md";
  }>(),
  { size: "md" }
);
</script>

<template>
  <div class="-ml-1.5 flex items-center gap-1">
    <a
      v-for="link in links"
      :key="link.platform"
      :href="link.url"
      target="_blank"
      rel="noopener noreferrer"
      class="hover:text-primary active:text-primary dark:hover:text-primary dark:active:text-primary rounded-lg text-gray-600 dark:text-gray-400"
      :class="size === 'sm' ? 'p-1.5' : 'p-2'"
    >
      <GithubIcon
        v-if="link.platform === 'github'"
        :class="size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'"
      />
      <LinkedInIcon
        v-else-if="link.platform === 'linkedin'"
        :class="size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'"
      />
      <InstagramIcon
        v-else-if="link.platform === 'instagram'"
        :class="size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'"
      />
      <TwitterIcon
        v-else-if="link.platform === 'twitter'"
        :class="size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'"
      />
    </a>
  </div>
</template>
