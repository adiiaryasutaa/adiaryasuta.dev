import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
    meta: [
      { name: "author", content: "Adi Aryasuta" },
      { name: "theme-color", content: "#0284c7" },
      { name: "robots", content: "index, follow" },
      { property: "og:site_name", content: "Adi Aryasuta" },
      {
        property: "og:image",
        content: "https://adiaryasuta.vercel.app/assets/imgs/adiaryasuta.jpg",
      },
      { property: "og:image:width", content: "400" },
      { property: "og:image:height", content: "400" },
      { name: "twitter:card", content: "summary" },
      {
        name: "twitter:image",
        content: "https://adiaryasuta.vercel.app/assets/imgs/adiaryasuta.jpg",
      },
    ],
  },

  modules: ["@nuxt/content", "@nuxtjs/i18n", "@nuxtjs/color-mode", "@nuxtjs/sitemap"],

  site: {
    url: "https://adiaryasuta.vercel.app",
    name: "Adi Aryasuta",
  },

  sitemap: {
    sources: ["/api/__sitemap__/urls"],
  },

  components: [
    { path: "~/components/ui", pathPrefix: false },
    { path: "~/components/ui/icons", pathPrefix: false },
    { path: "~/components/cards", pathPrefix: false },
    { path: "~/components/sections", pathPrefix: false },
    { path: "~/components/layout", pathPrefix: false },
    { path: "~/components/content", pathPrefix: false },
  ],

  content: {
    highlight: {
      theme: "github-dark",
      langs: [
        "bash",
        "typescript",
        "javascript",
        "vue",
        "css",
        "html",
        "php",
        "java",
        "json",
        "markdown",
        "sql",
      ],
    },
  },

  i18n: {
    vueI18n: "./i18n.config.ts",
    strategy: "prefix_except_default",
    locales: [
      { code: "en", language: "en-US", file: "en.json" },
      { code: "id", language: "id-ID", file: "id.json" },
    ],
    langDir: "locales/",
    defaultLocale: "en",
    detectBrowserLanguage: false,
    compilation: {
      strictMessage: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  css: ["~/assets/css/main.css"],

  colorMode: {
    classSuffix: "",
    fallback: "light",
  },

  compatibilityDate: "2025-07-05",
});
