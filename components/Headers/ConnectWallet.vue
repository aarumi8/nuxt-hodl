<template>
  <button v-if="!account.connected" class="connect-wallet" @click="connect()">
    Connect Wallet
  </button>
  <button v-else class="connected-wallet" @click="disconnect()">
    {{ account.shortAddress }}
  </button>

  <button
    v-if="!account.connected"
    class="connect-wallet-mobile"
    @click="connect()"
  >
    Connect
  </button>
  <button v-else class="connected-wallet-mobile" @click="disconnect()">
    {{ account.shortAddress }}
  </button>
</template>

<script setup lang="ts">
import {
  account,
  accountDetails,
  connect,
  disconnect,
} from "@kolirt/vue-web3-auth";
</script>
 
<style scoped>
.connect-wallet {
  display: flex;
  white-space: nowrap;
  padding: 20px 30px;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 4px 4px 5px 0px rgba(0, 0, 0, 0.2) inset,
    5px 5px 4px 0px rgba(0, 0, 0, 0.8);
  color: #000000;
  font-family: "Gilroy";
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  transition: transform 300ms;
  background: url("~/assets/noise-connect-btn.png"), lightgray 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.connected-wallet {
  display: flex;
  white-space: nowrap;
  padding: 20px 30px;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-family: "Gilroy";
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  transition: transform 300ms;
}

@media(hover:hover) {
  .connect-wallet:hover {
  transform: scale(1.05);
}

.connected-wallet:hover {
  transform: scale(1.05);
}
.connect-wallet-mobile:hover {
  transform: scale(1.05);
}

.connected-wallet-mobile:hover {
  transform: scale(1.05);
}
}

.connect-wallet:active {
  transform: scale(1.05);
}

.connected-wallet:active {
  transform: scale(1.05);
}

.connect-wallet-mobile {
  display: none;
  white-space: nowrap;
  padding: 15px 25px;
  justify-content: center;
  align-items: center;
  color: #000000;
  font-family: "Gilroy";
  font-size: 1rem;
  font-weight: 400;
  border-radius: 2px;
  background: rgb(255, 255, 255);
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.4) inset,
    0px 5px 4px 0px rgba(0, 0, 0, 0.8);
  transition: transform 300ms;
  background: url("~/assets/noise-connect-btn-m.png"), lightgray 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.connected-wallet-mobile {
  display: none;
  white-space: nowrap;
  padding: 15px 25px;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: "Gilroy";
  font-size: 1rem;
  font-weight: 400;
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.2);
  transition: transform 300ms;
}

.connect-wallet-mobile:active {
  transform: scale(1.05);
}

.connected-wallet-mobile:active {
  transform: scale(1.05);
}

@media (max-width: 767px) {
  .connect-wallet-mobile {
    margin-right: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex; /* Show connect wallet button on mobile */
  }
  .connected-wallet-mobile {
    margin-right: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex; /* Show connect wallet button on mobile */
  }

  .connect-wallet {
    display: none; /* Hide connect wallet button on mobile */
  }
  .connected-wallet {
    display: none; /* Hide connect wallet button on mobile */
  }
}
</style>