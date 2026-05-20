---
title: "TypeScript Best Practices for Vue 3 Projects"
description: "Explore practical TypeScript patterns and best practices I've adopted when building Vue 3 apps — including typed props, composables, and API responses."
tags: ["TypeScript", "Vue", "Tips"]
date: "2026-02-10"
---

## Always Type Your Props

Using `defineProps` with a TypeScript interface gives you full type safety and better IDE support:

```vue
<script setup lang="ts">
interface Props {
  title: string;
  count?: number;
  variant: "primary" | "secondary";
}

const props = defineProps<Props>();
</script>
```

Avoid using the runtime declaration form unless you need default values — and if you do, combine it with `withDefaults`:

```ts
const props = withDefaults(defineProps<Props>(), {
  count: 0,
  variant: "primary",
});
```

## Type Your Composables Explicitly

Don't let TypeScript infer return types on composables — write them explicitly so callers get a clear contract:

```ts
// composables/useCounter.ts
interface UseCounterReturn {
  count: Ref<number>;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export function useCounter(initial = 0): UseCounterReturn {
  const count = ref(initial);

  return {
    count,
    increment: () => count.value++,
    decrement: () => count.value--,
    reset: () => (count.value = initial),
  };
}
```

## Model Your API Responses

Never use `any` for API data. Define interfaces that mirror your API:

```ts
// models/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
```

Then fetch with full type safety:

```ts
const { data } = await useFetch<ApiResponse<User[]>>("/api/users");

// data.value.data is User[] — fully typed
```

## Discriminated Unions for State

Model loading states with a discriminated union instead of multiple booleans:

```ts
type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };

const state = ref<AsyncState<User[]>>({ status: "idle" });
```

```vue
<template>
  <div v-if="state.status === 'loading'">Loading...</div>
  <div v-else-if="state.status === 'error'">{{ state.message }}</div>
  <ul v-else-if="state.status === 'success'">
    <li v-for="user in state.data" :key="user.id">{{ user.name }}</li>
  </ul>
</template>
```

> Using discriminated unions makes impossible states truly impossible. When `status === 'success'`, TypeScript guarantees `data` is present — no optional chaining needed.

## Avoid `as` Casts

Type assertions (`as`) silence the compiler without actually checking types. Prefer type guards:

```ts
// Bad
const user = data as User;

// Good
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "email" in value
  );
}

if (isUser(data)) {
  console.log(data.email); // safe
}
```

These patterns make your codebase more maintainable and catch bugs at compile time rather than runtime.
