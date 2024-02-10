<template>
  <div class="wrapper-token-info-down">
    <div class="wrapper-token-info-caps">
      <div class="wrapper-item">
        <div class="grey-text">Market Cap</div>
        <div class="white-text">{{ vault.mcap }}</div>
      </div>
      <div class="wrapper-item">
        <div class="grey-text">Floor Market Cap</div>
        <div class="white-text">{{ vault.fmcap }}</div>
      </div>
      <div class="wrapper-item">
        <div class="grey-text">Vault Value</div>
        <div class="white-text">{{ vault.value }}</div>
      </div>
    </div>

    <div class="wrapper-token-info-contract">
      <div class="wrapper-item">
        <div class="grey-text">Contract</div>
      </div>
      <div class="wrapper-item">
        <div class="white-text">{{ vault.address }}</div>
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
.wrapper-token-info-down {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.wrapper-token-info-caps {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.wrapper-token-info-contract {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.wrapper-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.grey-text {
  color: rgb(143, 143, 143);
  font-family: Gilroy;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.white-text {
  color: #fff;
  font-family: Gilroy;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
@media (max-width: 868px) {
  .wrapper-token-info-down {
    width: 100%;
  }
}
</style>