<template>
  <BaseLoadingScreen v-if="!dataFetched" />
  <div v-else>
    <div class="page-intro">
      <ViewsPageIntroTextView
        :heading-text="'Web3 Tokens by the amount of the reserves in their vault'"
        :sub-text="'The total value of all vaults on Hodl Industries is'"
        :sub-text-active="totalValue"
      />

      <div class="button-wrapper">
        <CustomButtonsCreateVaultButton buttonColor="#FFF" buttonText="Create new Vault" @click="handleShowModal" />
      </div>

      <ModalsCreateVaultModal v-model="showModal" />

    </div>
    <div class="margin-wrapper-40-24">
      <ViewsVaultsList
        :columns="['#', 'Name', 'Price', 'Floor Price', 'Market Cap', 'Floor MC', 'Backed %']"
        :vaults="vaults"
        :tips="['', '', 'The market price of a token', 'The floor price represents how much money you can get for 1 token via the vault', 'The market cap of a token', 'The floor market cap of a token represents how much money in a vault', 'Backed % represents a ratio between the market cap and the floor market cap']"
       />
    </div>
    
  </div>

</template>

<script setup lang="ts">
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { account, accountDetails, connect, disconnect } from '@kolirt/vue-web3-auth'
const config = useRuntimeConfig()

const showModal = ref(false);
const vaults = ref([])
const totalValue = ref('$0')
const dataFetched = ref(false)

// Function to handle modal showing logic
function handleShowModal() {
  if (account.connected) {
    showModal.value = true;
  } else {
    toast("Please, connect your wallet", {
      "theme": "light",
      "type": "warning",
      "position": "top-center",
      "autoClose": 3000
    })
  }
}

async function fetchVaults() {
  const { data, error, pending } = await useFetch(config.public.baseURL + '/factory/vaults?skip=0&limit=100')
  
  for(var i = 0; i < data.value.length; i++) {
    vaults.value.push({
      id: data.value[i]._id,
      image: data.value[i].primaryToken.logo,
      name: data.value[i].primaryToken.name,
      ticker: data.value[i].primaryToken.ticker,
      price: data.value[i].primaryToken.price.toFixed(2),
      floorPrice: data.value[i].floorPrice < 0.001 ? '0' : data.value[i].floorPrice,
      mcap: data.value[i].primaryToken.marketCap < 0.001 ? '0' : data.value[i].primaryToken.marketCap.toFixed(2),
      fmcap: data.value[i].floorMarketCap < 0.001 ? '0' : data.value[i].floorMarketCap.toFixed(2),
      backedPercent: data.value[i].backedPercent < 0.001 ? '0' : data.value[i].backedPercent,
      address: data.value[i].vaultAddress
    })
  }
}

async function fetchData() {
  const { data, error, pending } = await useFetch(config.public.baseURL + '/factory/allVaultsTotalValue')

  totalValue.value = '$' + data.value.toFixed(2)
}

onMounted(async () => {
  // Use Promise.all to wait for both fetch operations to complete
  await Promise.all([fetchData(), fetchVaults()]);
  // Only set dataFetched to true after both promises resolve
  dataFetched.value = true;
});
</script>

<style scoped>
.margin-wrapper-40-24 {
  margin: 40px 0;
}
.page-intro {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.button-wrapper {
  display: flex;
  width: 25%;
}
@media (max-width: 960px) {
  .button-wrapper {
    width: 100%;
  }
  .margin-wrapper-40-24 {
  margin: 24px 0;
}
}
</style>
