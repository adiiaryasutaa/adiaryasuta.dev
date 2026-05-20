<script setup lang="ts">
definePageMeta({ middleware: "admin", layout: false });

const en = useAdminResource<Record<string, any>>("en", "/api/admin/locale/en");
const id = useAdminResource<Record<string, any>>("id", "/api/admin/locale/id");

onMounted(() => Promise.all([en.load(), id.load()]));

const isDirty = computed(() => en.isDirty.value || id.isDirty.value);
const loading = computed(() => en.loading.value || id.loading.value);
const saved = computed(() => en.saved.value || id.saved.value);

async function save() {
  await Promise.all([
    en.isDirty.value ? en.save() : Promise.resolve(),
    id.isDirty.value ? id.save() : Promise.resolve(),
  ]);
}

function discard() {
  en.discard();
  id.discard();
}

// Flatten nested object to dot-notation paths for display
function flattenKeys(obj: any, prefix = ""): { key: string; path: string[] }[] {
  const result: { key: string; path: string[] }[] = [];
  for (const [k, v] of Object.entries(obj ?? {})) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (typeof v === "string" || typeof v === "number") {
      result.push({ key: path, path: path.split(".") });
    } else if (Array.isArray(v)) {
      result.push({ key: path, path: path.split(".") });
    } else if (typeof v === "object") {
      result.push(...flattenKeys(v, path));
    }
  }
  return result;
}

const enKeys = computed(() => (en.data.value ? flattenKeys(en.data.value) : []));

function getVal(obj: any, path: string[]): any {
  return path.reduce((acc, k) => acc?.[k], obj);
}

function setVal(obj: any, path: string[], val: any) {
  const last = path[path.length - 1]!;
  const parent = path.slice(0, -1).reduce((acc, k) => acc?.[k], obj);
  if (parent) parent[last] = val;
}

// Highlight meta.* section at top
const metaKeys = computed(() => enKeys.value.filter((k) => k.key.startsWith("meta.")));
const otherKeys = computed(() => enKeys.value.filter((k) => !k.key.startsWith("meta.")));
const orderedKeys = computed(() => [...metaKeys.value, ...otherKeys.value]);
</script>

<template>
  <AdminShell>
    <h1 class="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">i18n Translations</h1>
    <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
      Edit EN and ID locale strings side by side. <strong>meta.*</strong> keys control page SEO
      descriptions.
    </p>

    <div v-if="loading && !en.data.value" class="py-12 text-center text-gray-400">Loading…</div>

    <div v-else-if="en.data.value && id.data.value" class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-800">
            <th class="py-2 pr-4 text-left text-xs font-medium text-gray-500">Key</th>
            <th class="py-2 pr-4 text-left text-xs font-medium text-gray-500">EN</th>
            <th class="py-2 text-left text-xs font-medium text-gray-500">ID</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-gray-900">
          <tr
            v-for="item in orderedKeys"
            :key="item.key"
            :class="item.key.startsWith('meta.') ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''"
          >
            <td class="py-2 pr-4">
              <code class="text-xs text-gray-500">{{ item.key }}</code>
            </td>
            <td class="py-2 pr-4">
              <textarea
                v-if="typeof getVal(en.data.value, item.path) === 'string'"
                :value="getVal(en.data.value, item.path)"
                rows="1"
                class="w-full min-w-[200px] rounded border border-gray-200 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                @input="
                  setVal(en.data.value, item.path, ($event.target as HTMLTextAreaElement).value)
                "
              />
              <span v-else class="text-xs text-gray-400 italic">{{
                typeof getVal(en.data.value, item.path)
              }}</span>
            </td>
            <td class="py-2">
              <textarea
                v-if="typeof getVal(id.data.value, item.path) === 'string'"
                :value="getVal(id.data.value, item.path)"
                rows="1"
                class="w-full min-w-[200px] rounded border border-gray-200 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                @input="
                  setVal(id.data.value, item.path, ($event.target as HTMLTextAreaElement).value)
                "
              />
              <span v-else class="text-xs text-gray-400 italic">{{
                typeof getVal(id.data.value, item.path)
              }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <AdminSaveBar
      :is-dirty="isDirty"
      :loading="loading"
      :saved="saved"
      @save="save"
      @discard="discard"
    />
  </AdminShell>
</template>
