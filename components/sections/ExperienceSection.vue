<script setup lang="ts">
import { allEducation } from "@/models/experience/education";
import { allVolunteer } from "@/models/experience/volunteer";
import { allWork } from "@/models/experience/work";

const works = allWork();
const volunteers = allVolunteer();
const educations = allEducation();
</script>

<template>
  <Container>
    <template #title>
      <ContainerTitle>{{ $t('about.experience-section-title') }}</ContainerTitle>
    </template>
    <div class="flex flex-col gap-8 pt-4">
      <div class="flex flex-col gap-2">
        <h1
          class="text-gray-900 text-2xl font-medium text-left dark:text-gray-100"
        >
          {{ $t('about.experience-work') }}
        </h1>
        <div class="flex flex-col gap-4">
          <WorkExperienceCard v-for="work in works" :work="work" />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <h1
          class="text-gray-900 text-2xl font-medium text-left dark:text-gray-100"
        >
          {{ $t('about.experience-volunteer') }}
        </h1>
        <div class="flex flex-col gap-4">
          <VolunteerExperienceCard
            v-for="volunteer in volunteers"
            :volunteer="volunteer"
          />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <h1
          class="text-gray-900 text-2xl font-medium text-left dark:text-gray-100"
        >
          {{ $t('about.experience-education') }}
        </h1>
        <div class="flex flex-col gap-4">
          <EducationExperienceCard
            v-for="education in educations"
            :education="education"
          />
        </div>
      </div>
    </div>
  </Container>
</template>
