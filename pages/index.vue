<script setup lang="ts">

const { t } = useI18n();

useSeoMeta({
  title: () => t('brand'),
  description: () => t('meta.description'),
  ogTitle: () => t('brand'),
  ogDescription: () => t('meta.description'),
  ogType: 'website',
  ogUrl: 'https://adiaryasuta.vercel.app',
  twitterTitle: () => t('brand'),
  twitterDescription: () => t('meta.description'),
});

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Adi Aryasuta',
      url: 'https://adiaryasuta.vercel.app',
      jobTitle: 'Full-Stack Web & Mobile Developer',
      image: 'https://adiaryasuta.vercel.app/assets/imgs/adiaryasuta.jpg',
      sameAs: [
        'https://github.com/adiiaryasutaa',
        'https://www.linkedin.com/in/i-gusti-ngurah-agung-adi-aryasuta-32870723b',
        'https://instagram.com/adiiaryasutaa',
      ],
    }),
  }],
});
</script>

<template>
  <MainSection>
    <HomeSection />
  </MainSection>
</template>
