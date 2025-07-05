<script setup lang="ts">
import AboutSection from '@/components/sections/AboutSection.vue';
import MainSection from '@/components/MainSection.vue';
import SkillSection from '@/components/sections/SkillSection.vue';
import ToolSection from '@/components/sections/ToolSection.vue';

const { t } = useI18n();

useHeadSafe({
  title: () => t('navbar.about'),
});
</script>

<template>
  <MainSection>
    <AboutSection class="pb-10"/>
    <SkillSection class="py-10"/>
    <ToolSection class="py-10"/>
  </MainSection>
</template>