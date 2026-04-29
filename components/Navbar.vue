<script setup lang="ts">
import ThemeButton from "@/components/ThemeButton.vue";
import LanguageButton from "@/components/LanguageButton.vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/20/solid";
import { ref } from "vue";
import NavbarItem from "@/components/NavbarItem.vue";

const router = useRouter();

const showNavigation = ref(false);
const windowOnTop = ref(true);

const toggleNavigation = () => {
  showNavigation.value = !showNavigation.value;
};

const closeNavigation = () => {
  showNavigation.value = false;
};

onMounted(() => {
  window.addEventListener("resize", closeNavigation);
  window.addEventListener("scroll", closeNavigation, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("resize", closeNavigation);
  window.removeEventListener("scroll", closeNavigation);
});
</script>

<template>
  <nav class="relative z-50">
    <!-- Backdrop: closes menu when tapping outside on mobile -->
    <div
      v-if="showNavigation"
      class="fixed inset-0 z-40 md:hidden"
      @click="closeNavigation"
    />

    <div class="container">
      <div class="flex justify-between items-center py-4">
        <div class="w-10 h-10">
          <img
            :hidden="router.currentRoute.value.path === '/'"
            src="/assets/imgs/adiaryasuta.jpg"
            alt="Adi Aryasuta"
            class="w-10 h-10 rounded-full border-2 border-gray-400 dark:border-gray-600"
          />
        </div>

        <div
          @click="showNavigation = false"
          class="navbar-nav absolute top-full left-3.5 right-3.5 z-50 bg-gray-200 p-2 border-2 border-gray-400 rounded-lg space-y-1 md:static md:flex md:items-center md:w-auto md:bg-gray-200 md:p-0 md:space-x-1 md:space-y-0 dark:md:bg-gray-950 dark:bg-gray-950 dark:border-gray-600"
          :class="{ hidden: !showNavigation }"
        >
          <NavbarItem :label="$t('navbar.home')" to="/" />
          <NavbarItem :label="$t('navbar.about')" to="/about" />
          <NavbarItem :label="$t('navbar.project')" to="/project" />
          <NavbarItem :label="$t('navbar.blog')" to="/blog" />
          <NavbarItem :label="$t('navbar.friend')" to="/friend" />
        </div>

        <div class="flex justify-end h-full space-x-2 sm:space-x-2">
          <!-- <LanguageButton /> -->
          <ThemeButton />
          <button
            @click="toggleNavigation"
            class="p-2 rounded-lg text-gray-500 border-2 border-gray-400 bg-gray-200 md:hidden hover:text-gray-600 hover:bg-gray-300 hover:cursor-pointer dark:text-gray-500 dark:border-gray-600 dark:bg-gray-950 dark:hover:text-gray-400 dark:hover:bg-gray-900"
          >
            <XMarkIcon v-if="showNavigation" class="w-5 h-5" />
            <Bars3Icon v-else class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@reference "../assets/css/main.css";

.navbar-nav > a:not(.router-link-active.router-link-exact-active) {
  @apply text-gray-600 hover:bg-gray-100 hover:text-gray-700 active:bg-gray-300 active:text-gray-800 focus:bg-gray-200 focus:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:active:bg-gray-600;
}

.navbar-nav {
  transition: width 0.5s;
}
</style>
