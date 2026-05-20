<script setup lang="ts">
import type { Friend } from "@/models/friend";

interface Props {
  friend: Friend;
}

const { friend } = defineProps<Props>();
</script>

<template>
  <Card class="transition-colors hover:border-primary hover:bg-primary-tint active:border-primary active:bg-primary">
    <div class="flex flex-row items-start gap-3">
      <img
        :src="friend.photo"
        :alt="friend.name"
        class="w-14 h-14 shrink-0 rounded-full object-cover border border-gray-400 dark:border-gray-600"
      />

      <div class="flex flex-col gap-1 min-w-0">
        <div class="flex flex-col gap-0.5">
          <h3 class="font-semibold text-gray-900 dark:text-gray-100 truncate">
            {{ friend.name }}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
            {{ friend.jobTitle }}
          </p>
        </div>

        <SocialLinks v-if="friend.socials.length" :links="friend.socials" size="sm" />
      </div>
    </div>
  </Card>
</template>
