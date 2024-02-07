<template>
  <button class="connect-wallet">Connect Wallet</button>
  <button class="connect-wallet-mobile">Connect</button>
</template>

<script setup lang="ts">
</script>

<style scoped>
.connect-wallet {
  display: flex;
  white-space: nowrap;
  padding: 1.85vh 2.08vw;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-family: "Gilroy";
  font-size: 1.25rem;
  font-weight: 500;
}

.connect-wallet:hover,
.connect-wallet:active {
  opacity: 0.75;
}

.connect-wallet-mobile {
  display: none;
  white-space: nowrap;
  padding: 1vh 4vw;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-family: "Gilroy";
  font-size: 1.125rem;
  font-weight: 500;
}

.connect-wallet-mobile:hover,
.connect-wallet-mobile:active {
  opacity: 0.75;
}

@media (max-width: 767px) {
  .connect-wallet-mobile {
    margin-right: 4vw;
    margin-top: 4vw;
    margin-bottom: 4vw;
    display: flex; /* Show connect wallet button on mobile */
  }

  .connect-wallet {
    display: none; /* Hide connect wallet button on mobile */
  }
}
</style>