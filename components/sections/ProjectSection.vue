<script setup lang="ts">
import ProjectCard from "~/components/cards/ProjectCard.vue";

const projects = useProject();
</script>

<template>
  <Container>
    <template #title>
      <ContainerTitle>{{ $t('project.section-title') }}</ContainerTitle>
    </template>
    <div class="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:mt-6 lg:mt-8 xl:grid-cols-3 xl:gap-8 xl:mt-10">
      <ProjectCard v-for="project in projects" :project="project"/>
    </div>
  </Container>
</template>