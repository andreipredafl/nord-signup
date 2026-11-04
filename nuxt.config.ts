// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  ssr: false,
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: { class: 'n:reset' },
    },
  },
  css: ['~/assets/css/main.css'],
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.startsWith('nord-'),
    },
  },
  compatibilityDate: '2025-07-15',
  vite: {
    plugins: [tailwindcss()],
  },
  typescript: {
    typeCheck: 'build',
    tsConfig: {
      compilerOptions: {
        types: ['@nordhealth/components/lib/vue.d.ts'],
      },
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
