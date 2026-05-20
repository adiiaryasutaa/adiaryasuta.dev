<script setup lang="ts">
const links = [
  { platform: "github" as const, url: "https://github.com/adiiaryasutaa" },
  {
    platform: "linkedin" as const,
    url: "https://www.linkedin.com/in/i-gusti-ngurah-agung-adi-aryasuta-32870723b",
  },
  { platform: "instagram" as const, url: "https://instagram.com/adiiaryasutaa" },
  { platform: "twitter" as const, url: "https://twitter.com/lolcecep" },
];
</script>

<template>
  <SocialLinks :links="links" size="md" />
</template>
