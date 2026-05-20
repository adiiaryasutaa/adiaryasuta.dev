<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: () => t("brand"),
  description: () => t("meta.description"),
  ogTitle: () => t("brand"),
  ogDescription: () => t("meta.description"),
  ogType: "website",
  ogUrl: "https://adiaryasuta.dev",
  twitterTitle: () => t("brand"),
  twitterDescription: () => t("meta.description"),
});

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Adi Aryasuta",
        url: "https://adiaryasuta.dev",
        jobTitle: "Full-Stack Web & Mobile Developer",
        image: "https://adiaryasuta.dev/assets/imgs/adiaryasuta.jpg",
        sameAs: [
          "https://github.com/adiiaryasutaa",
          "https://www.linkedin.com/in/i-gusti-ngurah-agung-adi-aryasuta-32870723b",
          "https://instagram.com/adiiaryasutaa",
        ],
      }),
    },
  ],
});
</script>

<template>
  <MainSection>
    <HomeSection />
  </MainSection>
</template>
