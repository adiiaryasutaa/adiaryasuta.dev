export function useAdminResource<T>(resource: string, endpoint?: string) {
  const apiBase = endpoint ?? `/api/admin/data/${resource}`;
  const data = ref<T | null>(null);
  const original = ref<string>("");
  const sha = ref<string>("");
  const loading = ref(false);
  const saved = ref(false);

  const isDirty = computed(() => JSON.stringify(data.value) !== original.value);

  async function load() {
    loading.value = true;
    try {
      const res = await $fetch<{ data: T; sha: string }>(apiBase);
      data.value = res.data;
      original.value = JSON.stringify(res.data);
      sha.value = res.sha;
    } finally {
      loading.value = false;
    }
  }

  async function save() {
    if (!isDirty.value) return;
    loading.value = true;
    saved.value = false;
    try {
      await $fetch(apiBase, {
        method: "PUT",
        body: { data: data.value, sha: sha.value },
      });
      original.value = JSON.stringify(data.value);
      // Refresh sha after commit
      const res = await $fetch<{ data: T; sha: string }>(apiBase);
      sha.value = res.sha;
      saved.value = true;
      setTimeout(() => (saved.value = false), 5000);
    } finally {
      loading.value = false;
    }
  }

  function discard() {
    data.value = JSON.parse(original.value);
    saved.value = false;
  }

  return { data, sha, loading, saved, isDirty, load, save, discard };
}
