<script setup lang="ts">
definePageMeta({ middleware: "admin", layout: false });

const { data, loading, saved, isDirty, load, save, discard } = useAdminResource<any[]>("friend");

onMounted(load);

function addFriend() {
  data.value?.push({
    photo: "",
    name: "",
    jobTitle: "",
    socials: [],
  });
}

function removeFriend(i: number) {
  data.value?.splice(i, 1);
}

function addSocial(friend: any) {
  friend.socials.push({ platform: "github", url: "" });
}

function removeSocial(friend: any, i: number) {
  friend.socials.splice(i, 1);
}

const platforms = ["github", "linkedin", "instagram", "twitter"];
</script>

<template>
  <AdminShell>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-xl font-bold text-gray-900 dark:text-gray-100">Friends</h1>
      <button
        class="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium text-white"
        @click="addFriend"
      >
        + Add Friend
      </button>
    </div>

    <div v-if="loading && !data" class="py-12 text-center text-gray-400">Loading…</div>

    <div v-else-if="data" class="flex flex-col gap-4">
      <div
        v-for="(friend, i) in data"
        :key="i"
        class="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
      >
        <div class="mb-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <img
              v-if="friend.photo"
              :src="friend.photo"
              class="h-10 w-10 rounded-full object-cover"
            />
            <span class="font-medium text-gray-800 dark:text-gray-200">{{
              friend.name || "New friend"
            }}</span>
          </div>
          <button class="text-sm text-red-500 hover:text-red-700" @click="removeFriend(i)">
            Remove
          </button>
        </div>

        <div class="grid gap-3 sm:grid-cols-3">
          <div>
            <label class="mb-1 block text-xs text-gray-500">Name</label>
            <input
              v-model="friend.name"
              class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
          <div>
            <label class="mb-1 block text-xs text-gray-500">Job Title</label>
            <input
              v-model="friend.jobTitle"
              class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
          <div>
            <label class="mb-1 block text-xs text-gray-500">Photo URL</label>
            <input
              v-model="friend.photo"
              class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
        </div>

        <div class="mt-3">
          <div class="mb-2 flex items-center justify-between">
            <label class="text-xs text-gray-500">Socials</label>
            <button class="text-primary text-xs hover:underline" @click="addSocial(friend)">
              + Add
            </button>
          </div>
          <div class="flex flex-col gap-2">
            <div v-for="(social, si) in friend.socials" :key="si" class="flex gap-2">
              <select
                v-model="social.platform"
                class="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              >
                <option v-for="p in platforms" :key="p" :value="p">{{ p }}</option>
              </select>
              <input
                v-model="social.url"
                placeholder="URL"
                class="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
              <button
                class="text-red-400 hover:text-red-600"
                @click="removeSocial(friend, Number(si))"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      </div>
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
