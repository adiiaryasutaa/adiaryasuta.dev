<script setup lang="ts">
import MainSection from '@/components/MainSection.vue';
import AboutSection from '@/components/sections/AboutSection.vue';
import ExperienceSection from '@/components/sections/ExperienceSection.vue';
import TechStackSection from '@/components/sections/TechStackSection.vue';

const { t } = useI18n();

useHeadSafe({
  title: () => t('navbar.about'),
});
</script>

<template>
  <MainSection>
    <AboutSection class="pb-10" />
    <ExperienceSection class="py-10" />
    <TechStackSection class="py-10" />
  </MainSection>
</template>