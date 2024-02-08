<template>
  <div>
    <BaseHeadingText text="Vault Reserves Structure" />
    <div class="wrapper">
      <ViewsTokensList
        :columns="['#', 'Name', 'Price', 'Amount', 'Total']"
        :vaults="vaults"
      />
      <div class="wrapper-chart">
        <ViewsTokenAllocation
          :tokens=tokensAllocation
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Token {
  name: string;
  percentage: number;
  color: string;
}

const vaults = [
  {
    id: 0,
    name: "Router Protocol",
    ticker: "$ROUTE",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
    price: "$100",
    amount: "23",
    total: "2323wadwa",
    address: "0x1234",
  },
  {
    id: 1,
    name: "Vault A",
    ticker: "$UNI",
    price: "$100",
    amount: "23wadwdwawddw",
    total: "2323",
    address: "0x12345",
  },
  // Add more vault items as needed
];
const tokensAllocation = [
  { name: 'Token A', percentage: 25, color: '#FFf' },
  { name: 'Token B', percentage: 30, color: '#fff' },
  { name: 'Token C', percentage: 15, color: '#fff' },
  { name: 'Token D', percentage: 30, color: '#fff' },
];
</script>

<style scoped>
.wrapper {
  display: flex;
  width: 100%;
  gap: 20px
}
.wrapper-chart{
  display: flex; 
  width: 33%
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
@media (max-width: 960px) {
  .button-wrapper {
    width: 100%;
  }
  .margin-wrapper-40-24 {
    margin: 24px 0;
  }
}
@media (max-width: 868px) {
  .wrapper {
    flex-direction: column;
  }
  .wrapper-chart{
    width: 100%
  }
}
</style>
