<script setup lang="ts">
import SocialMediaSection from "@/components/sections/SocialMediaSection.vue";
import Paragraph from "@/components/Paragraph.vue";
import Card from "../cards/Card.vue";
</script>

<template>
  <section class="container">
    <div class="flex flex-col items-start">
      <div class="max-w-2xl flex flex-col space-y-8">
        <div class="flex flex-col space-y-4">
          <div class="h-40 w-40">
            <img
              src="/assets/imgs/adiaryasuta.jpg"
              alt="Adi Aryasuta"
              class="rounded-full border-2 border-gray-400 dark:border-gray-600"
            />
          </div>

          <div>
            <h1
              class="text-3xl text-gray-800 font-semibold lg:text-4xl dark:text-gray-200"
            >
              {{ $t("home.brand") }}
            </h1>
          </div>

          <a
            href="https://gdg.community.dev/gdg-on-campus-primakara-university-denpasar-indonesia/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card>
              <div class="flex space-x-2 items-center">
                <img
                  src="/assets/imgs/gdg.webp"
                  alt="GDG Logo"
                  class="w-10 h-10 rounded-lg border-2 border-gray-400 dark:border-gray-600"
                />
                <span
                  class="text-gray-900 dark:text-gray-50 text-sm font-bold"
                  >{{
                    $t(
                      "Google Developer Group on Campus Primakara University Lead",
                    )
                  }}</span
                >
              </div>
            </Card>
          </a>

          <div>
            <Paragraph>
              {{ $t("home.description") }}
            </Paragraph>
          </div>
        </div>

        <div class="flex flex-col space-y-4">
          <SocialMediaSection />

          <div>
            <NuxtLink
              to="/about"
              class="px-4 py-2 text-sm font-medium border border-gray-400 rounded-lg hover:bg-gray-100 active:bg-gray-200 focus:ring-2 focus:ring-gray-200 dark:border-gray-600 dark:hover:bg-gray-900 dark:active:bg-gray-800 dark:focus:ring-gray-800 dark:text-gray-50"
            >
              {{ $t("home.see-more") }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
