<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div v-if="modalStep === 1">
          <div class="modal-items-cols">
            <div class="modal-item-col">
              <div class="modal-header-text">Create a HODL Vault</div>
              <div class="modal-sub-text">
                A HODL vault is a vault, that backs the token of your choice.
                Token holders will be able to get a piece of the fund by burning
                their tokens.
              </div>
              <div class="modal-sub-text">
                They’ll receive a proportional amount of the fund, to the amount
                of the total supply they’ve burnt.
              </div>
              <!-- <button @click="nextStep">Next</button> -->
            </div>

            <div class="modal-item-col">
              <div class="modal-item-row">
                <div class="modal-item-col">
                  <div class="modal-sub-header-text">
                    Build Stability into the token
                  </div>
                  <div class="modal-sub-text">
                    Make the token be backed at least with something, not only
                    dreams of future growth
                  </div>
                </div>
                <div class="modal-item-col">
                  <div class="modal-sub-header-text">
                    Provide liquidity forever
                  </div>
                  <div class="modal-sub-text">
                    The only way to get the funds out of the HODL vault, is to
                    burn the tokens being backed
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-item-col">
              <div class="modal-sub-header-text">
                Create the 1st reason to HODL
              </div>
              <div class="modal-sub-text">
                After you create the HODL vault for the token of your choice,
                people could donate money into it, this money will back the
                token, creating the first reason for anyone to HODL it.
              </div>
            </div>

            <BaseButton @click="nextStep">Start the process</BaseButton>
          </div>
        </div>

        <div v-if="modalStep === 2">
          <div v-if="!loadingTransaction">
            <div class="modal-items-cols">
              <div class="modal-item-col">
                <div class="modal-header-text">Create a HODL Vault</div>
                <div class="modal-sub-text">
                  Let’s start by choosing the token, that you want to back
                </div>
              </div>

              <div class="modal-item-col">
                <div class="modal-sub-text">Select a token to back</div>
                <BaseSelect v-model="selectedToken" :options="tokens" />
              </div>

              <div class="modal-item-col">
                <div class="modal-item-row">
                  <div class="modal-item-col">
                    <div class="modal-sub-text">Market Cap</div>
                    <div class="modal-sub-header-text">Select a Token</div>
                  </div>
                  <div class="modal-item-col" style="text-align: right">
                    <div class="modal-sub-text">Price</div>
                    <div class="modal-sub-header-text">Select a Token</div>
                  </div>
                </div>
              </div>

              <BaseView>
                <div class="modal-item-row">
                  <div class="modal-sub-text">Estimated Gas Fee</div>
                  <div class="modal-sub-header-text">{{ gasPrice }}</div>
                </div>
              </BaseView>

              <BaseButton @click="nextStep">Create HODL Vault</BaseButton>
            </div>
          </div>

          <div v-else>
            <div class="modal-items-cols">
              <div class="modal-sub-header-text">
                Loading. Please, approve transaction in MetaMask and wait till
                transaction is completed.
              </div>
            </div>
          </div>
        </div>

        <div v-if="modalStep === 3">
          <div class="modal-items-cols">
            <div class="modal-item-col">
              <div style="display: flex; align-items: center; gap: 20px">
                <span class="success" />
                <div class="modal-header-text">$TOKEN Vault Created!</div>
              </div>
              <div class="modal-sub-text">
                Now anyone can deposit funds into it, to support $TOKEN token
                hodlers!
              </div>
            </div>

            <div class="modal-item-col">
              <div class="modal-sub-text">$TOKEN Vault Address</div>
              <BaseView
                style="flex-direction: row; justify-content: space-between"
              >
                <div class="modal-sub-text">{{ tokenVaultAddress }}</div>
                <span
                  class="clipboard"
                  @click="copyToClipboard(tokenVaultAddress)"
                />
              </BaseView>
              <div class="modal-sub-text">
                Anyone can donate funds to support $TOKEN token hodlers:
              </div>
              <div class="modal-sub-text">
                &nbsp;&nbsp;&nbsp;&nbsp;• Send funds directly to the vault
                address<br />&nbsp;&nbsp;&nbsp;&nbsp;• Through Hodl Industries
                UI
              </div>
            </div>

            <BaseButton @click="goToVault" style="margin-top: 50px"
              >Go to the Vault</BaseButton
            >
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
} from "@kolirt/vue-web3-auth";
import factoryABI from "../../assets/abis/factoryABI.json";
import vaultABI from "../../assets/abis/vaultABI.json";
const { gasPrice, fetchContractGas } = useGasPrice();

const config = useRuntimeConfig();
var tokens = [];
const selectedToken = ref({ value: "", label: "", address: "" });
const loadingTransaction = ref(false);

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const isVisible = ref(props.modelValue);
const modalStep = ref(1);
const tokenVaultAddress = ref("Loading data");

async function nextStep() {
  if (!account.connected) {
    alert("Connect a wallet to continue");
    closeModal();
    return;
  }

  if (modalStep.value === 2 && !selectedToken.value.address) {
    alert("Please, choose a token");
    return;
  }

  if (modalStep.value === 2 && selectedToken.value.address) {
    var txHash = await createVault();
    if (!txHash) {
      return;
    }
    await fetchVaultAddress(txHash);
    loadingTransaction.value = false;
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
    // Optionally, display a message to the user indicating success.
  } catch (err) {
    console.error("Failed to copy text: ", err);
    // Optionally, display an error message to the user.
  }
};

async function createVault() {
  loadingTransaction.value = true;
  try {
    const data = await writeContract({
      abi: factoryABI,
      address: config.public.factoryAddress,
      functionName: "createNewVault",
      args: [selectedToken.value.address, true],
    });

    console.log("hash", data.hash);

    await data.wait();

    console.log("transaction successfully");

    return data.hash;
  } catch (err) {
    console.log(err);
    alert("An error happened. Details: " + err);
    closeModal();
    loadingTransaction.value = false;
    // Return false to indicate failure
    return false;
  }
}

async function goToVault() {
  console.log(tokenVaultAddress.value.length);
  if (tokenVaultAddress.value.length === 42) {
    await navigateTo(`/vault/${tokenVaultAddress.value}`);
  } else {
    alert(
      "The vault not found. Please, update the page to see the vault on the main page"
    );
    closeModal();
  }
}

function closeModal() {
  emit("update:modelValue", false);
  modalStep.value = 1;
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
    });
  }
}

async function fetchVaultAddress(txHash: String) {
  try {
    const transactionReceipt = await fetchTransactionReceipt({
      hash: txHash,
    });

    const events = parseEvents({ abi: factoryABI }, transactionReceipt);
    tokenVaultAddress.value = events[0].args.newVaultAddress;

    return;
  } catch (err) {
    console.log(err);
  }
  tokenVaultAddress.value =
    "Could not load new vault address due to slow network. Please, update the page to see the vault.";
}

function fetchData() {
  try {
    fetchTokens();
    fetchContractGas();
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
