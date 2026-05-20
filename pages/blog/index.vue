<script setup lang="ts">

const { t } = useI18n();

useSeoMeta({
  title: () => t('navbar.blog'),
  description: () => t('meta.blog-description'),
  ogTitle: () => t('navbar.blog'),
  ogDescription: () => t('meta.blog-description'),
  ogType: 'website',
  ogUrl: 'https://adiaryasuta.vercel.app/blog',
  twitterTitle: () => t('navbar.blog'),
  twitterDescription: () => t('meta.blog-description'),
});
</script>

<template>
  <MainSection>
    <BlogSection />
  </MainSection>
</template>
