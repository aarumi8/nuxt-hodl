<template>
  <BaseView style="width: 100%">
    <div class="wrapper-vault-i">
      <div class="wrapper-vault-texts">
        <div class="wrapper-vault-item">
          <div class="vault-grey-text">Your Wallet Balance</div>
          <div class="vault-white-text">{{totalBalance}}</div>
        </div>

        <div class="wrapper-vault-item">
          <div class="vault-grey-text" style="text-align: right">
            Your {{ vault.ticker }} Balance
          </div>
          <div class="vault-white-text" style="text-align: right">
            {{ tokenBalance }}
          </div>
        </div>
      </div>

      <div class="wrapper-vault-item">
        <CustomButtonsDonateButton
          buttonColor="#fff"
          buttonText="Donate to Vault"
          textColor="#000"
          @click="handleShowDonateModal"
        />
        <div
          class="vault-grey-text"
          style="color: #fff !important; font-weight: 500 !important"
        >
          By depositing into Vault, you increase the Floor Price and Floor
          Market Cap of the token
        </div>
      </div>

      <div class="wrapper-vault-item">
        <CustomButtonsWithdrawButton
          buttonColor="rgb(48, 48, 48)"
          buttonText="Burn to Withdraw"
          textColor="#fff"
          border="1px solid rgb(104,104,104)"
          @click="handleShowWithdrawModal"
        />
        <div
          class="vault-grey-text"
          style="color: #fff !important; font-weight: 500 !important"
        >
          By burning to withdraw, you burn {{ vault.ticker }} token, and get a
          portion of the {{ vault.ticker }} vault in exchange
        </div>
      </div>

      <ModalsDonateVaultModal :vault="vault" v-model="showDonateModal" />
      <ModalsWithdrawVaultModal
        :vault="vault"
        :tokens="reserves"
        :primaryToken="primaryToken"
        v-model="showWithdrawModal"
      />
    </div>
  </BaseView>
</template>

<script setup lang="ts">
import {
  account,
  accountDetails,
  connect,
  disconnect,
  fetchBalance,
} from "@kolirt/vue-web3-auth";
const config = useRuntimeConfig();
var tokens = [];

const props = defineProps({
  vault: Object,
  reserves: Object,
});

const showDonateModal = ref(false);
const showWithdrawModal = ref(false);
const tokenBalance = ref("0");
const primaryToken = ref();
const totalBalance = ref('0')

watch(
  () => account.connected,
  (newStatus: Boolean) => {
    if (newStatus) {
      fetchData();
      fetchTokens()
    }
  }
);

// Function to handle modal showing logic
function handleShowDonateModal() {
  if (account.connected) {
    showDonateModal.value = true;
  } else {
    alert("Please connect your wallet");
  }
}

// Function to handle modal showing logic
function handleShowWithdrawModal() {
  if (account.connected) {
    showWithdrawModal.value = true;
  } else {
    alert("Please connect your wallet");
  }
}

async function fetchData() {
  try {
    let _tokenBalance = await fetchBalance({
      address: account.address,
      token: props.vault.tokenAddress,
    });

    tokenBalance.value = _tokenBalance.formatted;

    primaryToken.value = {
      address: props.vault.tokenAddress,
      balance: _tokenBalance.value,
      balanceFormatted: _tokenBalance.formatted,
      decimals: _tokenBalance.decimals,
    };
  } catch (err) {
    console.log(err);
  }
}

async function fetchTokens() {
  const { data, error, pending } = await useFetch(
    config.public.baseURL + "/user?address=" + account.address
  );
  totalBalance.value = formatBalance(data.value.totalBalance)
  for (var i = 0; i < data.value.balances.length; i++) {
    tokens.push({
      value: data.value.balances[i].token.name,
      label: data.value.balances[i].token.name,
      address: data.value.balances[i].token.tokenAddress,
      balance: data.value.balances[i].balance,
      amountInput: "",
      amount: 0,
      decimals: data.value.balances[i].token.decimals,
      price: data.value.balances[i].token.price
    });
  }
}

function formatBalance(totalBalance: any) {
  if (totalBalance >= 1_000_000) { // Checks if the totalBalance is equal to or greater than 1 million
    return '$' + (totalBalance / 1_000_000).toFixed(2) + 'M';
  } else if (totalBalance >= 100_000) { // Checks if the totalBalance is equal to or greater than 100 thousand
    return '$' + (totalBalance / 1_000).toFixed(2) + 'k';
  } else {
    return '$' + totalBalance.toFixed(2);
  }
}

onMounted(() => {
  if (account.connected) {
    fetchData();
    fetchTokens();
  }
});
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