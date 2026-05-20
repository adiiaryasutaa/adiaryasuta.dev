<script setup lang="ts">
const { data: posts } = await useAsyncData("blogs", () =>
  queryCollection("blog").order("date", "DESC").all()
);
</script>

<template>
  <Container>
    <template #title>
      <ContainerTitle>{{ $t("blog.section-title") }}</ContainerTitle>
    </template>
    <div class="mt-4 flex flex-col gap-4">
      <BlogCard v-for="post in posts" :key="post.path" :post="post" />
    </div>
  </Container>
</template>
