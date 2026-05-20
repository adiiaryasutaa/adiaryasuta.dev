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
    class="sticky top-0 z-50 bg-gray-50 dark:bg-gray-900 navbar-root"
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
      <div class="flex justify-between items-center py-4">
        <div class="w-10 h-10">
          <img
            src="/assets/imgs/adiaryasuta.jpg"
            alt="Adi Aryasuta"
            class="w-10 h-10 rounded-full border border-gray-400 dark:border-gray-600 transition-all duration-300"
            :class="router.currentRoute.value.path === '/' ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'"
          />
        </div>

        <div
          @click="showNavigation = false"
          class="navbar-nav absolute top-full left-3.5 right-3.5 z-50 bg-gray-200 p-2 border border-gray-400 rounded-lg md:static md:flex md:items-center md:w-auto md:bg-gray-200 md:p-0 dark:md:bg-gray-950 dark:bg-gray-950 dark:border-gray-600 transition-all duration-200 ease-out"
          :class="showNavigation ? 'opacity-100 translate-y-0 pointer-events-auto visible' : 'max-md:opacity-0 max-md:-translate-y-2 max-md:pointer-events-none max-md:invisible'"
        >
          <NavbarItem :label="$t('navbar.home')" to="/" />
          <NavbarItem :label="$t('navbar.about')" to="/about" />
          <NavbarItem :label="$t('navbar.project')" to="/project" />
          <NavbarItem :label="$t('navbar.blog')" to="/blog" :partial="true" />
          <NavbarItem :label="$t('navbar.friend')" to="/friend" />
        </div>

        <div class="flex justify-end h-full space-x-2 sm:space-x-2">
          <LanguageButton />
          <ThemeButton />
          <button
            @click="toggleNavigation"
            class="p-2 rounded-lg text-gray-500 border border-gray-400 bg-gray-200 md:hidden hover:text-primary hover:border-primary hover:bg-gray-300 hover:cursor-pointer dark:text-gray-500 dark:border-gray-600 dark:bg-gray-950 dark:hover:text-primary dark:hover:border-primary dark:hover:bg-gray-900"
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
  transition: translate 300ms ease, box-shadow 300ms ease;
}

.navbar-nav > a:not(.router-link-active.router-link-exact-active):not(.partial-active) {
  @apply text-gray-500 hover:text-primary active:text-primary dark:text-gray-400 dark:hover:text-primary dark:active:text-primary;
}

</style>
