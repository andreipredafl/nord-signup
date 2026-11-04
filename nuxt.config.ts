// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  ssr: false,
  devtools: { enabled: true },
  compatibilityDate: '2025-07-15',
  typescript: { typeCheck: 'build' },
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
