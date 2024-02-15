<template>
  <BaseView style="width: 100%">
    <div class="wrapper-vault-i">
      <div class="wrapper-vault-texts">
        <div class="wrapper-vault-item">
          <div class="vault-grey-text">Your Wallet Balance</div>
          <div class="vault-white-text">$123</div>
        </div>

        <div class="wrapper-vault-item">
          <div class="vault-grey-text" style="text-align: right">Your {{vault.ticker}} Balance</div>
          <div class="vault-white-text" style="text-align: right">542</div>
        </div>
      </div>

      <div class="wrapper-vault-item">
        <CustomButtonsDonateButton
          buttonColor="#fff"
          buttonText="Donate to Vault"
          textColor="#000"
          @click="showDonateModal = true"
        />
        <div class="vault-grey-text" style="color: #fff !important; font-weight: 500 !important;">By depositing into Vault, you increase the Floor Price and Floor Market Cap of the token</div>
      </div>

      <div class="wrapper-vault-item">
        <CustomButtonsWithdrawButton
          buttonColor="rgb(48, 48, 48)"
          buttonText="Burn to Withdraw"
          textColor="#fff"
          border="1px solid rgb(104,104,104)"
          @click="showWithdrawModal = true"
        />
        <div class="vault-grey-text" style="color: #fff !important; font-weight: 500 !important;">By burning to withdraw, you burn {{vault.ticker}} token, and get a portion of the {{vault.ticker}} vault in exchange</div>
      </div>

      <ModalsDonateVaultModal v-model="showDonateModal" />
      <ModalsWithdrawVaultModal v-model="showWithdrawModal" />
    </div>
  </BaseView>
</template>

<script setup lang="ts">
const props = defineProps({
  vault: Object,
});

const showDonateModal = ref(false);
const showWithdrawModal = ref(false)
</script>

<style scoped>
.wrapper-vault-i {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.wrapper-vault-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.wrapper-vault-texts {
  display: flex;
  justify-content: space-between;
}
.vault-grey-text {
  color: rgb(143, 143, 143);
  opacity: 0.8;
  font-family: Gilroy;
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.vault-white-text {
  color: #fff;
  font-family: Gilroy;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
</style>