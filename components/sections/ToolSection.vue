<script setup lang="ts">
import Container from '@/components/Container.vue';
import ContainerTitle from '@/components/ContainerTitle.vue';
import ToolCard from "~/components/cards/ToolCard.vue";

const tools = useTool();
</script>

<template>
  <section>
    <Container>
      <template #title>
        <ContainerTitle>{{ $t('about.tool-section-title') }}</ContainerTitle>
      </template>
      <div
          class="grid grid-cols-2 gap-4 sm:grid-cols-3 mt-4 md:grid-cols-4 md:mt-6 lg:grid-cols-5 lg:mt-8 xl:grid-cols-6 xl:mt-10">
        <ToolCard v-for="tool in tools" :tool="tool"/>
      </div>
    </Container>
  </section>
</template>