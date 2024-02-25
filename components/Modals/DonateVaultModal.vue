<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div v-if="modalStep === 1">
          <div class="modal-items-cols">
            <div class="modal-item-col">
                <div class="modal-header-text">Donate to $TOKEN Vault</div>
                <div class="modal-sub-text">By donating into Vault, you increase the Floor Price and Floor Market Cap of the token, by that helping the token holders</div>
            </div>

            <div class="modal-item-col">
            <div class="modal-item-col">
                <BaseSelectView v-model="selectedToken" :options="tokens" />
            </div>

            <BaseView>
                <div class="modal-item-row">
                    <div class="modal-item-row" style="gap:10px; align-items:center">
                        <div class="modal-sub-header-text">+0.05%</div>
                        <div class="modal-sub-text">To $TOKEN floor price</div>
                    </div>
                    <div class="modal-sub-header-text">{{ gasPrice }}</div>
                </div>
            </BaseView>
            </div>


            <BaseButton @click="nextStep">Approve Transaction</BaseButton>
          </div>
        </div>

        <div v-if="modalStep === 2">
            <div class="modal-items-cols">   
                <div class="modal-item-col">
                    <div class="modal-header-text">Review</div>
                </div>


            <div class="modal-item-col">
            <BaseView>
                <div class="modal-items-col">  
                    <div class="modal-sub-text" style="margin-bottom: 10px">You Deposit</div>
                    <div class="modal-item-row" style="align-items:center">
                        <div class="modal-item-col" style="gap: 5px">
                            <div class="modal-header-text">{{ selectedToken.amountInput }}</div>
                            <div class="modal-sub-text">159</div>
                        </div>
                        <div class="modal-item-col">
                            <img v-if="imgSrc" :src="imgSrc" class="vault-image" style="transform: scale(2)">
                        </div>
                    </div>
                </div>
            </BaseView>

            <BaseView>
                <div class="modal-item-row">
                    <div class="modal-item-row" style="gap:10px; align-items:center">
                        <div class="modal-sub-header-text">+0.05%</div>
                        <div class="modal-sub-text">To $TOKEN floor price</div>
                    </div>
                    <div class="modal-sub-header-text">{{ gasPrice }}</div>
                </div>
            </BaseView>
            </div>


                <BaseButton @click="donateVault">Proceed</BaseButton>
            </div>   
        </div>

      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import {
  account,
  accountDetails,
  connect,
  disconnect,
  fetchGasPrice,
  fetchTransactionReceipt,
  parseEvents,
  writeContract,
  sendTransaction,
  erc20ABI
} from "@kolirt/vue-web3-auth";
import { formatUnits, parseUnits  } from 'viem'
const { gasPrice, fetchTransferGas } = useGasPrice();

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const isVisible = ref(props.modelValue);
const modalStep = ref(1);
const tokenVaultAddress = ref('$TOKEN Vault Address');
const imgSrc = ref("https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png")

const config = useRuntimeConfig();
var tokens = [];
const selectedToken = ref({ value: "", label: "", address: "", amountInput: "", decimals: 18 });
const loadingTransaction = ref(false);

function nextStep() {
    if (!account.connected) {
    alert("Connect a wallet to continue");
    closeModal();
    return;
  }
    if (modalStep.value === 1 && !selectedToken.value.address) {
    alert("Please, choose a token");
    return;
  }

  if(selectedToken.value.amountInput === '') {
    alert('Please, type an amount of token to send')
    return
  }

  selectedToken.value.amount = parseUnits(selectedToken.value.amountInput, selectedToken.value.decimals)
  if(selectedToken.value.amount > selectedToken.value.balance) {
    alert('you dont have that amount of token')
    return
  }
  
  modalStep.value++;
}

watch(
  () => account.connected,
  (newStatus: Boolean) => {
    if (newStatus) {
      fetchData();
    }
  }
);

watch(
  () => props.modelValue,
  (newVal: Boolean) => {
    isVisible.value = newVal;
  }
);

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard');
    // Optionally, display a message to the user indicating success.
  } catch (err) {
    console.error('Failed to copy text: ', err);
    // Optionally, display an error message to the user.
  }
};

function closeModal() {
  emit("update:modelValue", false);
  modalStep.value = 1;
}

async function sendEth(amount: BigInt) {
  const txn = await sendTransaction({
    to: '0xA6b879015E10aCD04290438d934ffBda98694b30',
    value: amount
  })
}

async function sendToken(address: String, amount: BigInt) {
    try {
    const data = await writeContract({
      abi: erc20ABI,
      address: address,
      functionName: "transfer",
      args: ['0xA6b879015E10aCD04290438d934ffBda98694b30', amount],
    });

    console.log("hash", data.hash);

    await data.wait();

    console.log("transaction successfully");

    return data.hash;
  } catch (err) {
    console.log(err);
    alert("An error happened. Details: " + err);
    closeModal();
    return false;
  }
}

async function donateVault() {
  if(selectedToken.value.address === "0x0000000000000000000000000000000000000000000000000000000000000000") {
    await sendEth(selectedToken.value.amount)
  } else {
    await sendToken(selectedToken.value.address, selectedToken.value.amount)
  }
}

async function fetchTokens() {
  const { data, error, pending } = await useFetch(
    config.public.baseURL + "/user?address=" + account.address
  );
  for (var i = 0; i < data.value.balances.length; i++) {
    tokens.push({
      value: data.value.balances[i].token.name,
      label: data.value.balances[i].token.name,
      address: data.value.balances[i].token.tokenAddress,
      balance: data.value.balances[i].balance,
      amountInput: "",
      amount: 0,
      decimals: data.value.balances[i].token.decimals
    });
  }
}

function fetchData() {
  try {
    fetchTokens();
    fetchTransferGas();
  } catch (err) {
    console.log(err);
  }
}

onMounted(() => {
  
  if (account.connected) {
    fetchData();
  }
});
</script>

<style scoped>
.kek {

}
</style>
