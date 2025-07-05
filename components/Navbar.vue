<script setup lang="ts">
import ThemeButton from '@/components/ThemeButton.vue';
import LanguageButton from '@/components/LanguageButton.vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/20/solid';
import { ref } from 'vue';
import NavbarItem from '@/components/NavbarItem.vue';

const showNavigation = ref(false);
const windowOnTop = ref(true);

const toggleNavigation = () => {
  showNavigation.value = !showNavigation.value;
};

onMounted(() => {
  window.addEventListener('resize', () => {
    showNavigation.value = false;
  });

  window.addEventListener('scroll', () => {
    windowOnTop.value = window.scrollY <= 0;
  });
})
</script>

<template>
  <nav class="fixed w-full z-10"
       :class="{ 'bg-slate-100/90 backdrop-blur-sm border-b border-slate-200 dark:bg-slate-900/90 dark:border-slate-700': !windowOnTop || (windowOnTop && showNavigation) }">
    <div class="container">
      <div class="flex flex-wrap justify-between items-center py-4">
        <div class="text-slate-900 font-medium md:text-xl dark:text-slate-300">
          <h1 class="font-semibold text-xl sm:text-2xl">{{ $t('brand') }}</h1>
        </div>

        <div class="flex items-center h-full space-x-0.5 md:order-3 sm:space-x-2">
          <LanguageButton/>
          <ThemeButton/>
          <button @click="toggleNavigation"
                  class="p-2 rounded-sm text-slate-500 hover:text-slate-600 hover:bg-slate-50 active:bg-slate-100 focus:text-slate-600 focus:ring-3 focus:ring-slate-200 md:hidden dark:ring-slate-700 dark:hover:text-slate-500 dark:hover:bg-slate-800 dark:active:bg-slate-700">
            <XMarkIcon v-if="showNavigation" class="w-5 h-5"/>
            <Bars3Icon v-else class="w-5 h-5"/>
          </button>
        </div>

        <div
            @click="showNavigation = false"
            class="navbar-nav w-full bg-slate-100 mt-4 rounded-sm p-2 border border-slate-200 space-y-2 md:order-2 md:flex md:items-center md:w-auto md:bg-transparent md:space-x-2 md:mt-0 md:p-0 md:border-0 md:space-y-0 dark:bg-slate-800 dark:border-slate-700 dark:md:bg-transparent"
            :class="{ 'hidden': !showNavigation }">
          <NavbarItem :label="$t('navbar.home')" to="/"/>
          <NavbarItem :label="$t('navbar.about')" to="/about"/>
          <NavbarItem :label="$t('navbar.project')" to="/project"/>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@reference "../assets/css/main.css";

.navbar-nav > a:not(.router-link-active.router-link-exact-active) {
  @apply text-slate-600 hover:bg-slate-200 hover:text-slate-700 active:bg-slate-300 active:text-slate-800 focus:bg-slate-200 focus:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-300 dark:active:bg-slate-600;
}

.navbar-nav {
  transition: width 0.5s;
}
</style>