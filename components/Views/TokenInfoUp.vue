<template>
  <div class="wrapper-token-info-up">
    <div style="display: flex; align-items: center">
      <img :src="vault.image" class="vault-image" />
      <div class="label-text">
        {{ vault.name }}
        <span class="ticker">{{ vault.ticker }}</span>
      </div>
    </div>

    <div class="wrapper-pricing">
      <div class="wrapper-price">
        <div class="heading-price">Current Price</div>
        <div class="sub-price">{{ vault.price }}</div>
      </div>

      <div class="wrapper-price">
        <div class="heading-price">Floor Price</div>
        <div class="sub-price">{{ vault.floorPrice }}</div>
      </div>

      <div class="wrapper-price" style="text-align: right">
        <div class="heading-price">Backed %</div>
        <div class="sub-price">{{ vault.backedPercent }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  vault: Object,
});
</script>

<style scoped>
.wrapper-token-info-up {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.wrapper-pricing {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.wrapper-price {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.heading-price {
  color: rgb(143, 143, 143);
  font-family: Gilroy;
  font-size: 0.925rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.sub-price {
  color: #fff;
  font-family: Gilroy;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
@media (max-width: 868px) {
  .wrapper-token-info-up {
    width: 100%;
  }
}
</style>