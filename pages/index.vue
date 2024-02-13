<template>
  <div>
    <div class="page-intro">
      <ViewsPageIntroTextView
        :heading-text="'Web3 Tokens by the amount of the reserves in their vault'"
        :sub-text="'The total value of all vaults on Hodl Industries is'"
        :sub-text-active="'$200M'"
      />

      <div class="button-wrapper">
        <CustomButtonsCreateVaultButton buttonColor="#FFF" buttonText="Create new Vault" @click="showModal = true" />
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
const showModal = ref(false);
const vaults = [
  {
    id: 0,
    name: "Router Protocol",
    ticker: "$ROUTE",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
    price: "$100",
    floorPrice: "$90",
    mcap: "$1M",
    fmcap: "$900K",
    backedPercent: "90%",
    address: "0x1234",
  },
  {
    id: 1,
    name: "Vault A",
    ticker: "$UNI",
    price: "$100",
    floorPrice: "$90",
    mcap: "$1M",
    fmcap: "$900K",
    backedPercent: "90%",
    address: "0x12345",
  },
  // Add more vault items as needed
];
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
