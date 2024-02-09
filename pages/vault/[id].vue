<template>
  <div>
    <BaseHeadingText text="Vault Reserves Structure" />
    <div class="margin-wrapper-30-15"></div>
    <div class="wrapper">
      <ViewsTokensList
        ref="tableComponent"
        :columns="['#', 'Name', 'Price', 'Amount', 'Total']"
        :vaults="vaults"
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
  {
    id: 2,
    name: "Vault A",
    ticker: "$UNI",
    price: "$100",
    amount: "23wadwdwawddw",
    total: "2323",
    address: "0x12345",
  },
  {
    id: 3,
    name: "Vault A",
    ticker: "$UNI",
    price: "$100",
    amount: "23wadwdwawddw",
    total: "2323",
    address: "0x12345",
  },
  {
    id: 4,
    name: "Vault A",
    ticker: "$UNI",
    price: "$100",
    amount: "23wadwdwawddw",
    total: "2323",
    address: "0x12345",
  },
  {
    id: 5,
    name: "Vault A",
    ticker: "$UNI",
    price: "$100",
    amount: "23wadwdwawddw",
    total: "2323",
    address: "0x12345",
  },
  {
    id: 6,
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
  { name: "Token A", percentage: 25, color: "#FFf" },
  { name: "Token B", percentage: 30, color: "#fff" },
  { name: "Token C", percentage: 15, color: "#fff" },
  { name: "Token D", percentage: 30, color: "#fff" },
];
const tableComponent = ref(null);
const contentComponent = ref(null);

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
  adjustHeight();
  componentKey.value++;
};

onMounted(async () => {
  adjustHeight();
  window.addEventListener("resize", onResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", onResize);
});
</script>

<style scoped>
.margin-wrapper-30-15 {
  margin-top: 30px;
}
.wrapper {
  display: flex;
  width: 100%;
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
    flex-direction: column-reverse;
  }
  .wrapper-chart {
    width: 100%;
  }
  .margin-wrapper-30-15 {
    margin-top: 15px;
  }
}
</style>
