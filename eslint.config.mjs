// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import nordPlugin from '@nordhealth/eslint-plugin'

export default withNuxt(
  nordPlugin.configs['recommended-error'],
  {
    settings: {
      'better-tailwindcss': {
        entryPoint: './app/assets/css/main.css',
      },
    },
    rules: {
      'better-tailwindcss/no-unknown-classes': 'error',
    },
  },
)
