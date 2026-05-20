<script setup lang="ts">

const { t } = useI18n();

useSeoMeta({
  title: () => t('navbar.about'),
  description: () => t('meta.about-description'),
  ogTitle: () => t('navbar.about'),
  ogDescription: () => t('meta.about-description'),
  ogType: 'website',
  ogUrl: 'https://adiaryasuta.vercel.app/about',
  twitterTitle: () => t('navbar.about'),
  twitterDescription: () => t('meta.about-description'),
});
</script>

<template>
  <MainSection>
    <AboutSection class="pb-10" />
    <ExperienceSection class="py-10" />
    <TechStackSection class="py-10" />
  </MainSection>
</template>
