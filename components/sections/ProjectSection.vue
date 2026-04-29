<script setup lang="ts">
import ProjectCard from "~/components/cards/ProjectCard.vue";

const projects = useProject();
</script>

<template>
  <Container>
    <template #title>
      <ContainerTitle>{{ $t('project.section-title') }}</ContainerTitle>
    </template>
    <div class="flex flex-col gap-4 mt-4">
      <ProjectCard v-for="project in projects" :project="project"/>
    </div>
  </Container>
</template>