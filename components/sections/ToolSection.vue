<script setup lang="ts">
const tools = useTool();
</script>

<template>
  <section>
    <Container>
      <template #title>
        <ContainerTitle>{{ $t("about.tool-section-title") }}</ContainerTitle>
      </template>
      <div
        class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:mt-6 md:grid-cols-4 lg:mt-8 lg:grid-cols-5 xl:mt-10 xl:grid-cols-6"
      >
        <ToolCard v-for="tool in tools" :tool="tool" />
      </div>
    </Container>
  </section>
</template>
