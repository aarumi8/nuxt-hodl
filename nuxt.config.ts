// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  css: [
    '~/assets/css/global.css' // Path to your global stylesheet
  ],
  imports: {
    presets: [
      {
        from: 'chart.js',
        imports: ['Chart', 'registerables']
      },
    ]
  }
})
