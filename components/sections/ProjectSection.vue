<script setup lang="ts">
const projects = useProject();
</script>

<template>
  <Container>
    <template #title>
      <ContainerTitle>{{ $t("project.section-title") }}</ContainerTitle>
    </template>
    <div class="mt-4 flex flex-col gap-4">
      <ProjectCard v-for="project in projects" :project="project" />
    </div>
  </Container>
</template>
