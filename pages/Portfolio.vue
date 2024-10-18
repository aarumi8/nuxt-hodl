<template>
  <div v-if="account.connected">
    <BaseLoadingScreen v-if="!dataFetched" />
    <div v-else>
      <div class="page-intro">
        <ViewsPageIntroTextView
          :heading-text="'Your wallet portfolio'"
          :sub-text="'The total extractable value of your portfolio is'"
          :sub-text-active="totalBalance"
        />
      </div>

      <div class="margin-wrapper-40-24">
        <ViewsVaultsList
          :columns="['#', 'Name', 'Price', 'Floor Price', 'Amount', 'Value', 'Extractable Value']"
          :vaults="vaults"
          :tips="['', '', 'The market price of a token', 'The floor price represents how much money you can get for 1 token via the vault', 'Amount of tokens you have', 'Market value of your tokens', 'Amount of money you can get if you withdraw from a vault']"
        />
      </div>
    </div>
  </div>

  <div v-else class="wallet-not-connected">
    <BaseView>
      <BaseHeadingText text="Please, connect wallet to view your portfolio" />
    </BaseView>
  </div>
</template>

<script setup lang="ts">
import { account, accountDetails, connect, disconnect } from '@kolirt/vue-web3-auth';
import { formatUnits, parseUnits  } from 'viem'
const config = useRuntimeConfig();

const dataFetched = ref(false)

watch(
  () => account.connected,
  (newStatus: Boolean) => {
    if (newStatus) {
      fetchVaults();
    }
  }
);

const vaults = ref([])
const totalBalance = ref('0')

async function fetchVaults() {
  dataFetched.value = false;
  // const { data, error, pending } = await useFetch(config.public.baseURL + "/user?address=" + account.address)
  
  // totalBalance.value = '$' + data.value.totalBalance.toFixed(2)

  // for(var i = 0; i < data.value.vaults.length; i++) {
  //   const primaryTokenAddress = data.value.vaults[i].primaryToken.tokenAddress
  //   var primaryToken = null

  //   for(var j = 0; j < data.value.balances.length; j++) {
  //     if(data.value.balances[j].token.tokenAddress === primaryTokenAddress) {
  //       primaryToken = data.value.balances[j]
  //       break;
  //     }
  //   }

  //   vaults.value.push({
  //     id: data.value.vaults[i]._id,
  //     name: data.value.vaults[i].primaryToken.name,
  //     ticker: data.value.vaults[i].primaryToken.ticker,
  //     image: data.value.vaults[i].primaryToken.logo,
  //     price: data.value.vaults[i].primaryToken.price.toFixed(2),
  //     floorPrice: data.value.vaults[i].floorPrice < 0.001 ? '0' : data.value.vaults[i].floorPrice,
  //     exValue: ( formatUnits(primaryToken.balance, primaryToken.token.decimals) * data.value.vaults[i].floorPrice ).toFixed(2),
  //     amount: formatUnits(primaryToken.balance, primaryToken.token.decimals),
  //     value: (formatUnits(primaryToken.balance, primaryToken.token.decimals) * data.value.vaults[i].primaryToken.price.toFixed(2) ).toFixed(2),
  //     mcap: 0,
  //     fmcap: 0,
  //     backedPercent: 0,
  //     address: data.value.vaults[i].vaultAddress
  //   })

  // }
  dataFetched.value = true;
}

onMounted(async () => {
  if(account.connected) {
    await fetchVaults()
  }
  dataFetched.value = true;
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
.wallet-not-connected {
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95%;
  justify-content: center;
  text-align: center;
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
