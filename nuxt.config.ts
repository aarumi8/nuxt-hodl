// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  // only in production:
  // nitro: {
  //   serveStatic: true,
  // },
//   nitro: {
//     preset: 'firebase'
// },
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
  },
  plugins: [
    '~/plugins/web3-auth.ts',
  ],
  runtimeConfig: {
    wcProjectId: process.env.WC_PROJECT_ID,
    public: {
      baseURL: process.env.BASE_URL,
      wcProjectId: process.env.WC_PROJECT_ID,
      factoryAddress: process.env.FACTORY_ADDRESS
    }
  }
})
