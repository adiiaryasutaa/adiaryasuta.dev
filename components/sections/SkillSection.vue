<script setup lang="ts">
import { allHighlightSkills, allOtherSkills } from "@/models/skill";

const highlightSkills = allHighlightSkills();
const otherSkills = allOtherSkills();
</script>

<template>
  <section>
    <Container>
      <template #title>
        <ContainerTitle>{{ $t("about.skill-section-title") }}</ContainerTitle>
      </template>
      <div class="flex flex-col gap-2">
        <h1 class="text-left text-2xl font-medium text-gray-900 dark:text-gray-100">Highlight</h1>
        <div class="flex flex-col gap-4">
          <HighlightTechCard v-for="skill in highlightSkills" :skill="skill" />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <h1 class="text-left text-2xl font-medium text-gray-900 dark:text-gray-100">Other</h1>
        <div
          class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:mt-6 md:grid-cols-4 lg:mt-8 lg:grid-cols-5 xl:mt-10 xl:grid-cols-6"
        >
          <SkillCard v-for="skill in otherSkills" :skill="skill" />
        </div>
      </div>
    </Container>
  </section>
</template>
