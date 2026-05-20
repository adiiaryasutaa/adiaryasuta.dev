<script setup lang="ts">
definePageMeta({ middleware: "admin", layout: false });

const activeTab = ref<"work" | "education" | "volunteer">("work");

const work = useAdminResource<{ data: any[] }>("experience/work");
const education = useAdminResource<{ data: any[] }>("experience/education");
const volunteer = useAdminResource<{ data: any[] }>("experience/volunteer");

const current = computed(() => ({ work, education, volunteer })[activeTab.value]);

onMounted(async () => {
  await Promise.all([work.load(), education.load(), volunteer.load()]);
});

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function addWork() {
  work.data.value?.data.push({
    title: "",
    employment: "Full-time",
    company: "",
    description: "",
    current: false,
    start: { month: "January", year: "" },
    end: {},
    media: [],
  });
}

function addEducation() {
  education.data.value?.data.push({
    school: "",
    major: "",
    description: "",
    start: "",
    end: "",
  });
}

function addVolunteer() {
  volunteer.data.value?.data.push({
    title: "",
    organization: "",
    description: "",
    current: false,
    start: { month: "January", year: "" },
    end: {},
    media: [],
  });
}

function addItem() {
  if (activeTab.value === "work") addWork();
  else if (activeTab.value === "education") addEducation();
  else addVolunteer();
}

function removeItem(i: number) {
  current.value.data.value?.data.splice(i, 1);
}
</script>

<template>
  <AdminShell>
    <h1 class="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100">Experiences</h1>

    <!-- Tabs -->
    <div class="mb-6 flex gap-2">
      <button
        v-for="tab in ['work', 'education', 'volunteer'] as const"
        :key="tab"
        class="rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors"
        :class="
          activeTab === tab
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400'
        "
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <div
      v-if="current.loading.value && !current.data.value"
      class="py-12 text-center text-gray-400"
    >
      Loading…
    </div>

    <div v-else-if="current.data.value">
      <div class="mb-3 flex justify-end">
        <button
          class="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium text-white"
          @click="addItem"
        >
          + Add
        </button>
      </div>

      <div class="flex flex-col gap-4">
        <!-- Work & Volunteer -->
        <template v-if="activeTab !== 'education'">
          <div
            v-for="(item, i) in current.data.value.data"
            :key="i"
            class="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
          >
            <div class="mb-3 flex justify-between">
              <span class="text-sm text-gray-500">#{{ i + 1 }}</span>
              <button class="text-sm text-red-500" @click="removeItem(i)">Remove</button>
            </div>
            <div class="grid gap-3 sm:grid-cols-2">
              <div>
                <label class="mb-1 block text-xs text-gray-500">Title</label>
                <input
                  v-model="item.title"
                  class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
              <div>
                <label class="mb-1 block text-xs text-gray-500">{{
                  activeTab === "work" ? "Company" : "Organization"
                }}</label>
                <input
                  v-model="item[activeTab === 'work' ? 'company' : 'organization']"
                  class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
              <div v-if="activeTab === 'work'">
                <label class="mb-1 block text-xs text-gray-500">Employment type</label>
                <select
                  v-model="item.employment"
                  class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Freelance</option>
                  <option>Internship</option>
                </select>
              </div>
              <div class="sm:col-span-2">
                <label class="mb-1 block text-xs text-gray-500">Description</label>
                <textarea
                  v-model="item.description"
                  rows="2"
                  class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
              <div>
                <label class="mb-1 block text-xs text-gray-500">Start month</label>
                <select
                  v-model="item.start.month"
                  class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                >
                  <option v-for="m in months" :key="m" :value="m">{{ m }}</option>
                </select>
              </div>
              <div>
                <label class="mb-1 block text-xs text-gray-500">Start year</label>
                <input
                  v-model="item.start.year"
                  type="number"
                  class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
              <div>
                <label class="mb-2 flex items-center gap-2 text-xs text-gray-500">
                  <input v-model="item.current" type="checkbox" class="accent-primary" />
                  Current (no end date)
                </label>
              </div>
              <template v-if="!item.current">
                <div>
                  <label class="mb-1 block text-xs text-gray-500">End month</label>
                  <select
                    v-model="item.end.month"
                    class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  >
                    <option v-for="m in months" :key="m" :value="m">{{ m }}</option>
                  </select>
                </div>
                <div>
                  <label class="mb-1 block text-xs text-gray-500">End year</label>
                  <input
                    v-model="item.end.year"
                    type="number"
                    class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
              </template>
            </div>
          </div>
        </template>

        <!-- Education -->
        <template v-else>
          <div
            v-for="(item, i) in current.data.value.data"
            :key="i"
            class="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
          >
            <div class="mb-3 flex justify-between">
              <span class="text-sm text-gray-500">#{{ i + 1 }}</span>
              <button class="text-sm text-red-500" @click="removeItem(i)">Remove</button>
            </div>
            <div class="grid gap-3 sm:grid-cols-2">
              <div>
                <label class="mb-1 block text-xs text-gray-500">School</label>
                <input
                  v-model="item.school"
                  class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
              <div>
                <label class="mb-1 block text-xs text-gray-500">Major</label>
                <input
                  v-model="item.major"
                  class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
              <div>
                <label class="mb-1 block text-xs text-gray-500">Start year</label>
                <input
                  v-model="item.start"
                  type="number"
                  class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
              <div>
                <label class="mb-1 block text-xs text-gray-500">End year</label>
                <input
                  v-model="item.end"
                  type="number"
                  class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
              <div class="sm:col-span-2">
                <label class="mb-1 block text-xs text-gray-500">Description</label>
                <textarea
                  v-model="item.description"
                  rows="2"
                  class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <AdminSaveBar
      :is-dirty="current.isDirty.value"
      :loading="current.loading.value"
      :saved="current.saved.value"
      @save="current.save()"
      @discard="current.discard()"
    />
  </AdminShell>
</template>
