<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: () => t("navbar.project"),
  description: () => t("meta.project-description"),
  ogTitle: () => t("navbar.project"),
  ogDescription: () => t("meta.project-description"),
  ogType: "website",
  ogUrl: "https://adiaryasuta.dev/project",
  twitterTitle: () => t("navbar.project"),
  twitterDescription: () => t("meta.project-description"),
});
</script>

<template>
  <MainSection>
    <ProjectSection />
  </MainSection>
</template>
