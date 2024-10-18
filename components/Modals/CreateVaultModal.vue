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
                <div class="modal-sub-text">
                  Select a token from your portfolio to back
                </div>
                <BaseSelect v-model="selectedToken" :options="tokens" />
              </div>

              <div class="modal-item-col">
                <div class="modal-sub-text">
                  Or search a token by address to back
                </div>
                <ViewsCreateVaultSearchBar v-model="selectedToken" style="width: unset" />
              </div>

              <div class="modal-item-col">
                <div class="modal-item-row">
                  <div class="modal-item-col">
                    <div class="modal-sub-text">Market Cap</div>
                    <div class="modal-sub-header-text">
                      {{ formatBalance(selectedToken.mc) }}
                    </div>
                  </div>
                  <div class="modal-item-col" style="text-align: right">
                    <div class="modal-sub-text">Price</div>
                    <div class="modal-sub-header-text">
                      ${{ selectedToken.price.toFixed(2) }}
                    </div>
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
                <span v-if="showCopied" class="copied-message">✅</span>
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
} from "@kolirt/vue-web3-auth";
import factoryABI from "../../assets/abis/factoryABI.json";
import vaultABI from "../../assets/abis/vaultABI.json";
const { gasPrice, fetchContractGas } = useGasPrice();
const showCopied = ref(false);

const config = useRuntimeConfig();
var tokens = [];
const selectedToken = ref({
  value: "",
  label: "",
  address: "",
  image: "",
  price: 0.0,
  mc: 0.0,
});
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
    closeModal();
    return;
  }
  
  if (modalStep.value === 2 && !selectedToken.value.address) {
    toast("Please, choose a token", {
      theme: "light",
      type: "warning",
      position: "top-center",
      autoClose: 3000,
    });
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

async function createVault() {
  loadingTransaction.value = true;
  try {
    const data = await writeContract({
      abi: factoryABI,
      address: config.public.factoryAddress,
      functionName: "createNewVault",
      args: [selectedToken.value.address, selectedToken.value.isBurnable],
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
    toast(
      "The vault not found. Please, update the page to see the vault on the main page",
      {
        theme: "light",
        type: "warning",
        position: "top-center",
        autoClose: 5000,
      }
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
    // if token is already has a vault created or token doesnt have supply or token is ethereum, we cannot create a new vault for this token
    if(data.value.balances[i].token.haveVault || !data.value.balances[i].token.haveTotalSupply || data.value.balances[i].token.type === 'eth') {
      continue
    }

    tokens.push({
      value: data.value.balances[i].token.name,
      label: data.value.balances[i].token.name,
      image: data.value.balances[i].token.logo,
      address: data.value.balances[i].token.tokenAddress,
      price: data.value.balances[i].token.price,
      mc: data.value.balances[i].token.marketCap,
      isBurnable: data.value.balances[i].token.isBurnable,
      isLegit: data.value.balances[i].token.isLegit
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

function formatBalance(totalBalance: any) {
  if (totalBalance >= 1_000_000) {
    // Checks if the totalBalance is equal to or greater than 1 million
    return "$" + (totalBalance / 1_000_000).toFixed(2) + "M";
  } else if (totalBalance >= 100_000) {
    // Checks if the totalBalance is equal to or greater than 100 thousand
    return "$" + (totalBalance / 1_000).toFixed(2) + "k";
  } else {
    return "$" + totalBalance.toFixed(2);
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
