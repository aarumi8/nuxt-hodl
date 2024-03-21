<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div v-if="modalStep === 1">
          <div class="modal-items-cols">
            <div class="modal-item-col">
              <div class="modal-header-text">
                Donate to {{ vault.ticker }} Vault
              </div>
              <div class="modal-sub-text">
                By donating into Vault, you increase the Floor Price and Floor
                Market Cap of the token, by that helping the token holders
              </div>
            </div>

            <div class="modal-item-col">
              <div class="modal-item-col">
                <BaseSelectView v-model="selectedToken" :options="tokens" />
              </div>

              <BaseView>
                <div class="modal-item-row">
                  <div
                    class="modal-item-row"
                    style="gap: 10px; align-items: center"
                  >
                    <div class="modal-sub-header-text">
                      {{ vault.floorPrice }}
                    </div>
                    <div class="modal-sub-text">
                      {{ vault.ticker }} floor price
                    </div>
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
                  <div class="modal-sub-text" style="margin-bottom: 10px">
                    You Deposit
                  </div>
                  <div class="modal-item-row" style="align-items: center">
                    <div class="modal-item-col" style="gap: 5px">
                      <div class="modal-header-text">
                        {{ selectedToken.amountInput }}
                      </div>
                      <div class="modal-sub-text">
                        ${{
                          parseFloat(
                            selectedToken.amountInput * selectedToken.price
                          ).toFixed(2)
                        }}
                      </div>
                    </div>
                    <div class="modal-item-col">
                      <img
                        v-if="selectedToken.image"
                        :src="selectedToken.image"
                        class="vault-image"
                        style="transform: scale(2)"
                      />
                    </div>
                  </div>
                </div>
              </BaseView>

              <BaseView>
                <div class="modal-item-row">
                  <div
                    class="modal-item-row"
                    style="gap: 10px; align-items: center"
                  >
                    <div class="modal-sub-header-text">
                      {{ vault.floorPrice }}
                    </div>
                    <div class="modal-sub-text">
                      {{ vault.ticker }} floor price
                    </div>
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
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
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
  erc20ABI,
} from "@kolirt/vue-web3-auth";
import { formatUnits, parseUnits } from "viem";
const { gasPrice, fetchTransferGas } = useGasPrice();

const props = defineProps({
  modelValue: Boolean,
  vault: Object,
});

const emit = defineEmits(["update:modelValue"]);

const isVisible = ref(props.modelValue);
const modalStep = ref(1);
const tokenVaultAddress = ref("$TOKEN Vault Address");
const imgSrc = ref(
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"
);

const config = useRuntimeConfig();
var tokens = [];
const selectedToken = ref({
  value: "",
  label: "",
  address: "",
  amountInput: "",
  decimals: 18,
});
const loadingTransaction = ref(false);

function nextStep() {
  if (!account.connected) {
    toast("Please, connect your wallet", {
      theme: "light",
      type: "warning",
      position: "top-center",
      autoClose: 3000,
    });
    closeModal();
    return;
  }
  if (modalStep.value === 1 && !selectedToken.value.address) {
    toast("Please, choose a token", {
      theme: "light",
      type: "warning",
      position: "top-center",
      autoClose: 3000,
    });
    return;
  }

  if (selectedToken.value.amountInput === "") {
    toast("Please, type an amount of token to send", {
      theme: "light",
      type: "warning",
      position: "top-center",
      autoClose: 3000,
    });
    return;
  }

  selectedToken.value.amount = parseUnits(
    selectedToken.value.amountInput,
    selectedToken.value.decimals
  );
  if (selectedToken.value.amount > selectedToken.value.balance) {
    toast("You dont have that amount of token", {
      theme: "light",
      type: "error",
      position: "top-center",
      autoClose: 3000,
    });
    return;
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
    console.log("Text copied to clipboard");
    // Optionally, display a message to the user indicating success.
  } catch (err) {
    console.error("Failed to copy text: ", err);
    // Optionally, display an error message to the user.
  }
};

function closeModal() {
  emit("update:modelValue", false);
  modalStep.value = 1;
}

async function sendEth(amount: BigInt) {
  const txn = await sendTransaction({
    to: props.vault.vaultAddress,
    value: amount,
  });
}

async function sendToken(address: String, amount: BigInt) {
  try {
    const data = await writeContract({
      abi: erc20ABI,
      address: address,
      functionName: "transfer",
      args: [props.vault.vaultAddress, amount],
    });

    console.log("hash", data.hash);

    await data.wait();

    console.log("transaction successfully");

    return data.hash;
  } catch (err) {
    console.log(err);
    toast(
      "Error! Please, contact us on discord and provide the screenshot of this error: " +
        err,
      {
        theme: "light",
        type: "error",
        position: "top-center",
        autoClose: 15000,
      }
    );
    closeModal();
    return false;
  }
}

async function donateVault() {
  if (
    selectedToken.value.address ===
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  ) {
    await sendEth(selectedToken.value.amount);
  } else {
    await sendToken(selectedToken.value.address, selectedToken.value.amount);
  }
  closeModal();
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
      balanceFormatted: formatUnits(
        data.value.balances[i].balance,
        data.value.balances[i].token.decimals
      ),
      amountInput: "",
      amount: 0,
      decimals: data.value.balances[i].token.decimals,
      price: data.value.balances[i].token.price,
      image: data.value.balances[i].token.logo,
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
</style>
