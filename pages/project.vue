<script setup lang="ts">
import MainSection from '@/components/MainSection.vue';
import ProjectSection from "~/components/sections/ProjectSection.vue";

const { t } = useI18n();

useHeadSafe({
  title: () => t('navbar.project'),
});
</script>

<template>
  <MainSection>
    <ProjectSection/>
  </MainSection>
</template>