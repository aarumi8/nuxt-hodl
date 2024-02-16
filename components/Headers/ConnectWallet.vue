<template>
  <button v-if="!account.connected" class="connect-wallet" @click="connect()">Connect Wallet</button>
  <button v-else class="connect-wallet" @click="disconnect()">{{account.shortAddress}}</button>

  <button v-if="!account.connected" class="connect-wallet-mobile" @click="connect()">Connect</button>
  <button v-else class="connect-wallet-mobile" @click="disconnect()">{{account.shortAddress}}</button>
</template>

<script setup lang="ts">
import { account, accountDetails, connect, disconnect } from '@kolirt/vue-web3-auth'
</script>
 
<style scoped>
.connect-wallet {
  display: flex;
  white-space: nowrap;
  padding: 15px 30px;
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
  padding: 10px 20px;
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
    margin-right: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex; /* Show connect wallet button on mobile */
  }

  .connect-wallet {
    display: none; /* Hide connect wallet button on mobile */
  }
}
</style>