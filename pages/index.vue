<script setup lang="ts">
import MainSection from '@/components/MainSection.vue';
import HomeSection from "@/components/sections/HomeSection.vue";

const { t } = useI18n();

useHeadSafe({
  title: () => t('brand'),
});
</script>

<template>
  <MainSection>
    <HomeSection/>
  </MainSection>
</template>