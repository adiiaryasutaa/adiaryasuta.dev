<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: () => t("navbar.friend"),
  description: () => t("meta.friend-description"),
  ogTitle: () => t("navbar.friend"),
  ogDescription: () => t("meta.friend-description"),
  ogType: "website",
  ogUrl: "https://adiaryasuta.vercel.app/friend",
  twitterTitle: () => t("navbar.friend"),
  twitterDescription: () => t("meta.friend-description"),
});
</script>

<template>
  <MainSection>
    <FriendSection />
  </MainSection>
</template>
