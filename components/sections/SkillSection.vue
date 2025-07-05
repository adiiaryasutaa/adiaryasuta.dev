<script setup lang="ts">
import SkillCard from "~/components/cards/SkillCard.vue";

const skills = useSkill();
</script>

<template>
  <section>
    <Container>
      <template #title>
        <ContainerTitle>{{ $t('about.skill-section-title') }}</ContainerTitle>
      </template>
      <div
          class="grid grid-cols-2 gap-4 sm:grid-cols-3 mt-4 md:grid-cols-4 md:mt-6 lg:grid-cols-5 lg:mt-8 xl:grid-cols-6 xl:mt-10">
        <SkillCard v-for="skill in skills" :skill="skill"/>
      </div>
    </Container>
  </section>
</template>