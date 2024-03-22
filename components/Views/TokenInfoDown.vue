<template>
  <div class="wrapper-token-info-down">
    <div class="wrapper-token-info-caps">
      <div class="wrapper-item">
        <div class="grey-text">Market Cap</div>
        <div class="white-text">{{ formatBalance(vault.mcap) }}</div>
      </div>
      <div class="wrapper-item">
        <div class="grey-text">Floor Market Cap</div>
        <div class="white-text">${{ vault.fmcap }}</div>
      </div>
      <div class="wrapper-item">
        <div class="grey-text">Vault Value</div>
        <div class="white-text">${{ vault.value }}</div>
      </div>
    </div>

    <div class="wrapper-token-info-contract">
      <div class="wrapper-item">
        <div class="grey-text">Contract</div>
      </div>
      <div
        class="wrapper-item"
        style="justify-content: unset; gap: 5px; align-items: center"
      >
        <nuxt-link
          style="text-decoration: none"
          target="_blank"
          :to="`https://etherscan.com/address/${vault.tokenAddress}`"
          class="white-text"
          id="temp-id1"
          >{{ formatString(vault.tokenAddress) }}</nuxt-link
        >
        <span class="clipboard" @click="copyToClipboard(vault.tokenAddress)" />
        <span v-if="showCopied" class="copied-message">✅</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  vault: Object,
});

const showCopied = ref(false);

function formatString(str: String) {
  // Check if the string length is greater than 6
  if (str.length > 11) {
    // Return the first 3 chars, '...', and the last 3 chars
    return str.substring(0, 5) + "..." + str.substring(str.length - 6);
  } else {
    // Return the original string if it's 6 characters or less
    return str;
  }
}

const copyToClipboard = async (text: string) => {
  showCopied.value = true;
  try {
    await navigator.clipboard.writeText(text);
    // Optionally, display a message to the user indicating success.
  } catch (err) {
    console.error("Failed to copy text: ", err);
    // Optionally, display an error message to the user.
  }
  setTimeout(() => {
    showCopied.value = false;
  }, 1000);
};

function formatBalance(totalBalance: any) {
  if (totalBalance >= 1_000_000) {
    // Checks if the totalBalance is equal to or greater than 1 million
    return "$" + (totalBalance / 1_000_000).toFixed(2) + "M";
  } else if (totalBalance >= 100_000) {
    // Checks if the totalBalance is equal to or greater than 100 thousand
    return "$" + (totalBalance / 1_000).toFixed(2) + "k";
  } else {
    return "$" + totalBalance;
  }
}
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