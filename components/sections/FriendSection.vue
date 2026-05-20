<script setup lang="ts">
const friends = useFriend();
</script>

<template>
  <Container>
    <template #title>
      <ContainerTitle>{{ $t("friend.section-title") }}</ContainerTitle>
    </template>
    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      <FriendCard v-for="friend in friends" :key="friend.name" :friend="friend" />
    </div>
  </Container>
</template>
