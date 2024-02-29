<template>
  <div v-if="isFetched">
    <div class="vault-info">
      <div class="tokens-info-desktop">
        <ViewsTokenInfo :vault="vault" />
      </div>

      <div class="tokens-info-mobile">
        <ViewsTokenInfoUp :vault="vault" />
      </div>

      <ViewsVaultChart class="wrapper-vault-chart" :key="componentKey" />

      <div class="tokens-info-mobile">
        <ViewsTokenInfoDown :vault="vault" />
      </div>

      <div class="wrapper-vault-interact">
        <ViewsVaultInteract :vault="vault" :reserves="tokens" />
      </div>
    </div>

    <BaseView style="margin-top: 20px; padding: 25px">
      <div style="display: flex; gap: 5px; align-items: center">
        <div class="white-text">Vault Address:</div>
        <nuxt-link
          style="text-decoration: none"
          target="_blank"
          :to="`https://etherscan.com/address/${vault.vaultAddress}`"
          class="grey-text"
          >{{ vault.vaultAddress }}</nuxt-link
        >
      </div>
    </BaseView>

    <div class="margin-wrapper-60"></div>

    <BaseHeadingText text="Vault Reserves Structure" />

    <div class="margin-wrapper-30-15"></div>
    <div class="wrapper">
      <ViewsTokensList
        ref="tableComponent"
        :columns="['#', 'Name', 'Price', 'Amount', 'Total']"
        :vaults="tokens"
      />
      <div class="wrapper-chart">
        <ViewsTokenAllocation
          ref="contentComponent"
          :tokens="tokensAllocation"
          :key="componentKey"
        />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { formatUnits, parseUnits  } from 'viem'

const config = useRuntimeConfig();
const route = useRoute();


interface Token {
  name: string;
  percentage: number;
  color: string;
}

const vault = ref();
const isFetched = ref(false);
const tokens = ref([])
const tokensAllocation = ref([])

const tableComponent = ref(null);
const contentComponent = ref(null);

let lastWindowWidth = window.innerWidth; // Store the initial width

async function adjustHeight() {
  await nextTick();
  if (window.innerWidth > 868) {
    const contentHeight = contentComponent.value.$el.offsetHeight;
    tableComponent.value.$el.style.height = `${contentHeight}px`;
  } else {
    tableComponent.value.$el.style.height = "auto";
  }
}
const componentKey = ref(0);
const onResize = () => {
  // Only proceed if the width has actually changed
  if (window.innerWidth !== lastWindowWidth) {
    adjustHeight();
    componentKey.value++;
    lastWindowWidth = window.innerWidth; // Update the last known width
  }
};

async function fetchUser() {
  
}

async function fetchData() {
  const { data, error, pending } = await useFetch(
    config.public.baseURL + "/vault?address=" + route.params.id
  );

  vault.value = {
    id: data.value.id,
    name: data.value.primaryToken.name,
    ticker: data.value.primaryToken.ticker,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
    price: data.value.primaryToken.price.toFixed(2),
    vaultAddress: data.value.vaultAddress,
    tokenAddress: data.value.primaryToken.tokenAddress,
    floorPrice: data.value.floorPrice.toFixed(2),
    backedPercent: data.value.backedPercent.toFixed(2),
    mcap: data.value.primaryToken.marketCap.toFixed(2),
    fmcap: data.value.floorMarketCap.toFixed(2),

    amount: 0,
    value: data.value.floorMarketCap.toFixed(2),
  };

  for(var i = 0; i < data.value.reserves.length; i++) {
    tokens.value.push({
      id: i,
      name: data.value.reserves[i].token.name,
      ticker: data.value.reserves[i].token.ticker,
      price: (data.value.reserves[i].token.price).toFixed(2),
      address: data.value.reserves[i].token.tokenAddress,
      amount: parseFloat(formatUnits(data.value.reserves[i].balance, data.value.reserves[i].token.decimals)).toFixed(5),
      total: (parseFloat(formatUnits(data.value.reserves[i].balance, data.value.reserves[i].token.decimals)) * data.value.reserves[i].token.price).toFixed(2),
      selected: false
    })
  }

  for(var i = 0; i < data.value.reservesAllocation.length; i++) {
    tokensAllocation.value.push({
      percentage: (data.value.reservesAllocation[i] * 100).toFixed(3),
      name: tokens.length > 4 && i !== 4 ? 'Others' : tokens.value[i].name,
      color: "#fff"
    })
  }

  isFetched.value = true;
  adjustHeight();
  window.addEventListener("resize", onResize);
}

onMounted(async () => {
  fetchData();
});

onUnmounted(() => {
  window.removeEventListener("resize", onResize);
});
</script>

<style scoped>
.vault-info {
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
}
.tokens-info-desktop {
  display: flex;
  width: 25%;
}
.tokens-info-mobile {
  display: none;
}
.wrapper-vault-interact {
  display: flex;
  width: 25%;
}
.margin-wrapper-30-15 {
  margin-top: 30px;
}
.wrapper {
  display: flex;
  gap: 20px;
}
.wrapper-chart {
  display: flex;
  width: 33%;
}
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
.margin-wrapper-60 {
  margin-bottom: 60px;
}
.wrapper-vault-chart {
  width: 50%;
}
.grey-text {
  color: rgb(143, 143, 143);
  font-family: Gilroy;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.white-text {
  color: #fff;
  font-family: Gilroy;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
@media (max-width: 960px) {
  .button-wrapper {
    width: 100%;
  }
  .margin-wrapper-40-24 {
    margin: 24px 0;
  }
}
@media (max-width: 868px) {
  .white-text {
    font-size: 0.875rem;
  }
  .grey-text {
    font-size: 0.875rem;
  }
  .vault-info {
    flex-direction: column;
  }
  .tokens-info-desktop {
    display: none;
  }
  .wrapper {
    flex-direction: column-reverse;
  }
  .wrapper-chart {
    width: 100%;
  }
  .margin-wrapper-30-15 {
    margin-top: 15px;
  }
  .tokens-info-mobile {
    display: flex;
  }
  .wrapper-vault-interact {
    display: flex;
    width: 100%;
  }
  .wrapper-vault-chart {
    width: 100%;
    height: 40vh;
  }
}
</style>
