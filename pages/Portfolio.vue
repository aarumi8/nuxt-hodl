<template>
  <div>
    <div class="page-intro">
      <ViewsPageIntroTextView
        :heading-text="'Your wallet portfolio'"
        :sub-text="'The total extractable value of your portfolio is'"
        :sub-text-active="'$20,045'"
      />

    </div>
    <div class="margin-wrapper-40-24">
      <ViewsVaultsList
        :columns="['#', 'Name', 'Price', 'Floor Price', 'Amount', 'Value', 'Extractable Vaule']"
        :vaults="vaults"
       />
    </div>
    
  </div>
</template>

<script setup lang="ts">
const vaults = [
  {
    id: 0,
    name: "Router Protocol",
    ticker: "$ROUTE",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
    price: "$100",
    floorPrice: "$90",
    amount: "99",
    value: "$23",
    exValue: "123",
    address: "0x1234",
  },
  {
    id: 1,
    name: "Vault A",
    ticker: "$UNI",
    price: "$100",
    floorPrice: "$90",
    amount: "99",
    value: "$23",
    exValue: "123",
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
