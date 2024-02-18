import { defineNuxtPlugin } from '#app'
import { createWeb3Auth, Chains } from '@kolirt/vue-web3-auth'

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig()

    const web3Auth = createWeb3Auth({
        projectId: config.public.wcProjectId,
        chains: [Chains.sepolia, Chains.mainnet],
    });

    nuxtApp.vueApp.use(web3Auth);
});