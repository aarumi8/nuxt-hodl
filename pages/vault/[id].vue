<template>
  <div>
    <div class="tokens-info-desktop">
      <ViewsTokenInfo :vault="vault" />
    </div>

    <div class="tokens-info-mobile">
      <ViewsTokenInfoUp :vault="vault" />
    </div>

    <div class="tokens-info-mobile">
      <ViewsTokenInfoDown :vault="vault" />
    </div>

    <div class="margin-wrapper-60"></div>

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

const vault = {
  id: 0,
  name: "Router Protocol",
  ticker: "$ROUTE",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
  price: "$100",
  amount: "23",
  total: "2323wadwa",
  address: "0x1234",
  floorPrice: "$23",
  backedPercent: "14%",
  mcap: "$555,555,555",
  fmcap: "$555,555",
  value: "$555",
};

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
  { name: "Token C", percentage: 10, color: "#fff" },
  { name: "Token D", percentage: 35, color: "#fff" },
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
.tokens-info-desktop {
  display: flex;
}
.tokens-info-mobile {
  display: none;
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
@media (max-width: 960px) {
  .button-wrapper {
    width: 100%;
  }
  .margin-wrapper-40-24 {
    margin: 24px 0;
  }
}
@media (max-width: 868px) {
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
}
</style>
