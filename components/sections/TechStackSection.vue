<script setup lang="ts">
import { allTech } from "@/models/tech";

const techs = allTech();
</script>

<template>
  <section>
    <Container>
      <template #title>
        <ContainerTitle>Tech Stacks</ContainerTitle>
      </template>
      <div class="flex flex-col gap-8">
        <div
          class="flex flex-col gap-2"
          v-for="tech in Object.keys(techs) as (keyof typeof techs)[]"
          :key="tech"
        >
          <h2
            class="capitalize text-gray-900 text-2xl font-medium text-left dark:text-gray-100"
          >
            {{ tech }}
          </h2>
          <div class="flex flex-col gap-4">
            <HighlightTechCard
              v-for="t in techs[tech].filter((t) => t.highlight)"
              :tech="t"
            />
          </div>
          <div class="flex flex-row gap-4 flex-wrap mt-4">
            <TechChip
              v-for="t in techs[tech].filter((t) => !t.highlight)"
              :tech="t"
            />
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
