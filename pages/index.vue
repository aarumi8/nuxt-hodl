<template>
  <div>
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
        :columns="['#', 'Name', 'Price', 'Floor Price', 'Market Cap', 'Floor Market Cap', 'Backed %']"
        :vaults="vaults"
       />
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { account, accountDetails, connect, disconnect } from '@kolirt/vue-web3-auth'
const config = useRuntimeConfig()

const showModal = ref(false);
const vaults = ref([])
const totalValue = ref('$0')

// Function to handle modal showing logic
function handleShowModal() {
  if (account.connected) {
    showModal.value = true;
  } else {
    alert('Please connect your wallet to create a new vault.');
  }
}

function formatVaultData(vault: Object) {

}

async function fetchVaults() {
  const { data, error, pending } = await useFetch(config.public.baseURL + '/factory/vaults?skip=0&limit=100')
  
  for(var i = 0; i < data.value.length; i++) {
    vaults.value.push({
      id: data.value[i]._id,
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

onMounted(() =>{
  fetchData()
  fetchVaults()
})
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
