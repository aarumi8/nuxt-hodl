<template>
  <div>
    <div class="page-intro">
      <PageIntroTextView
        :heading-text="'Web3 Tokens by the amount of the reserves in their vault'"
        :sub-text="'The total value of all vaults on Hodl Industries is'"
        :sub-text-active="'$200M'"
      />
      <div class="button-wrapper">
        <CreateVaultButton buttonColor="#FFF" buttonText="Create new Vault" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
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
}
</style>
