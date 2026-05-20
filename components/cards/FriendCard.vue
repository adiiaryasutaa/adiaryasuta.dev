<script setup lang="ts">
import type { Friend } from "@/models/friend";

interface Props {
  friend: Friend;
}

const { friend } = defineProps<Props>();
</script>

<template>
  <Card
    class="hover:border-primary hover:bg-primary-tint active:border-primary active:bg-primary transition-colors"
  >
    <div class="flex flex-row items-start gap-3">
      <img
        :src="friend.photo"
        :alt="friend.name"
        class="h-14 w-14 shrink-0 rounded-full border border-gray-400 object-cover dark:border-gray-600"
      />

      <div class="flex min-w-0 flex-col gap-1">
        <div class="flex flex-col gap-0.5">
          <h3 class="truncate font-semibold text-gray-900 dark:text-gray-100">
            {{ friend.name }}
          </h3>
          <p class="truncate text-sm text-gray-500 dark:text-gray-400">
            {{ friend.jobTitle }}
          </p>
        </div>

        <SocialLinks v-if="friend.socials.length" :links="friend.socials" size="sm" />
      </div>
    </div>
  </Card>
</template>
