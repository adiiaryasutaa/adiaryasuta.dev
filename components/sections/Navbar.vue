<script setup lang="ts">
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/20/solid";

const router = useRouter();

const showNavigation = ref(false);
const scrollingDown = ref(false);
const scrolled = ref(false);
let lastScrollY = 0;

const toggleNavigation = () => {
  showNavigation.value = !showNavigation.value;
};

const closeNavigation = () => {
  showNavigation.value = false;
};

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  scrolled.value = currentScrollY > 0;
  if (currentScrollY > lastScrollY && currentScrollY > 60) {
    scrollingDown.value = true;
  } else if (currentScrollY < lastScrollY) {
    scrollingDown.value = false;
  }
  lastScrollY = currentScrollY;
  closeNavigation();
};

onMounted(() => {
  lastScrollY = window.scrollY;
  scrolled.value = window.scrollY > 0;
  window.addEventListener("resize", closeNavigation);
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("resize", closeNavigation);
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <nav
    class="navbar-root sticky top-0 z-50 bg-gray-50 dark:bg-gray-900"
    :class="{ '-translate-y-full': scrollingDown, 'shadow-md dark:shadow-gray-950/60': scrolled }"
  >
    <!-- Backdrop: dims page and closes menu when tapping outside on mobile -->
    <Transition name="backdrop">
      <div
        v-if="showNavigation"
        class="fixed inset-0 z-40 bg-black/40 md:hidden"
        @click="closeNavigation"
      />
    </Transition>

    <div class="container">
      <div class="flex items-center justify-between py-4">
        <div class="h-10 w-10">
          <img
            src="/assets/imgs/adiaryasuta.jpg"
            alt="Adi Aryasuta"
            class="h-10 w-10 rounded-full border border-gray-400 transition-all duration-300 dark:border-gray-600"
            :class="
              router.currentRoute.value.path === '/'
                ? 'pointer-events-none scale-75 opacity-0'
                : 'scale-100 opacity-100'
            "
          />
        </div>

        <div
          @click="showNavigation = false"
          class="navbar-nav absolute top-full right-3.5 left-3.5 z-50 rounded-lg border border-gray-400 bg-gray-200 p-2 transition-all duration-200 ease-out md:static md:flex md:w-auto md:items-center md:bg-gray-200 md:p-0 dark:border-gray-600 dark:bg-gray-950 dark:md:bg-gray-950"
          :class="
            showNavigation
              ? 'pointer-events-auto visible translate-y-0 opacity-100'
              : 'max-md:pointer-events-none max-md:invisible max-md:-translate-y-2 max-md:opacity-0'
          "
        >
          <NavbarItem :label="$t('navbar.home')" to="/" />
          <NavbarItem :label="$t('navbar.about')" to="/about" />
          <NavbarItem :label="$t('navbar.project')" to="/project" />
          <NavbarItem :label="$t('navbar.blog')" to="/blog" :partial="true" />
          <NavbarItem :label="$t('navbar.friend')" to="/friend" />
        </div>

        <div class="flex h-full justify-end space-x-2 sm:space-x-2">
          <LanguageButton />
          <ThemeButton />
          <button
            @click="toggleNavigation"
            class="hover:text-primary hover:border-primary dark:hover:text-primary dark:hover:border-primary rounded-lg border border-gray-400 bg-gray-200 p-2 text-gray-500 hover:cursor-pointer hover:bg-gray-300 md:hidden dark:border-gray-600 dark:bg-gray-950 dark:text-gray-500 dark:hover:bg-gray-900"
          >
            <XMarkIcon v-if="showNavigation" class="h-5 w-5" />
            <Bars3Icon v-else class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@reference "../../assets/css/main.css";

.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.2s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

.navbar-root {
  transition:
    translate 300ms ease,
    box-shadow 300ms ease;
}

.navbar-nav > a:not(.router-link-active.router-link-exact-active):not(.partial-active) {
  @apply hover:text-primary active:text-primary dark:hover:text-primary dark:active:text-primary text-gray-500 dark:text-gray-400;
}
</style>
