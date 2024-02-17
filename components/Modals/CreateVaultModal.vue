<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div v-if="modalStep === 1">
          <div class="modal-items-cols">
            <div class="modal-item-col">
                <div class="modal-header-text">Create a HODL Vault</div>
                <div class="modal-sub-text">A HODL vault is a vault, that backs the token of your choice. Token holders will be able to get a piece of the fund by burning their tokens.</div>
                <div class="modal-sub-text">They’ll receive a proportional amount of the fund, to the amount of the total supply they’ve burnt.</div>
                <!-- <button @click="nextStep">Next</button> -->
            </div>

            <div class="modal-item-col">
                <div class="modal-item-row">
                    <div class="modal-item-col">
                        <div class="modal-sub-header-text">Build Stability into the token</div>
                        <div class="modal-sub-text">Make the token be backed at least with something, not only dreams of future growth</div>
                    </div>
                    <div class="modal-item-col">
                        <div class="modal-sub-header-text">Provide liquidity forever</div>
                        <div class="modal-sub-text">The only way to get the funds out of the HODL vault, is to burn the tokens being backed</div>
                    </div>
                </div>
            </div>

            <div class="modal-item-col">
                <div class="modal-sub-header-text">Create the 1st reason to HODL</div>
                <div class="modal-sub-text">After you create the HODL vault for the token of your choice, people could donate money into it, this money will back the token, creating the first reason for anyone to HODL it.</div>
            </div>

            <BaseButton @click="nextStep">Start the process</BaseButton>
          </div>
        </div>

        <div v-if="modalStep === 2">
            <div class="modal-items-cols">   
                <div class="modal-item-col">
                    <div class="modal-header-text">Create a HODL Vault</div>
                    <div class="modal-sub-text">Let’s start by choosing the token, that you want to back</div>
                </div>

                <div class="modal-item-col">
                    <div class="modal-sub-text">Select a token to back</div>
                    <BaseSelect />
                </div>

                <div class="modal-item-col">
                    <div class="modal-item-row">
                        <div class="modal-item-col">
                            <div class="modal-sub-text">Market Cap</div>
                            <div class="modal-sub-header-text">Select a Token</div>
                        </div>
                        <div class="modal-item-col" style="text-align: right;">
                            <div class="modal-sub-text">Price</div>
                            <div class="modal-sub-header-text">Select a Token</div>
                        </div>
                    </div>
                </div>

                <BaseView>
                <div class="modal-item-row">
                    <div class="modal-sub-text">Estimated Gas Fee</div>
                    <div class="modal-sub-header-text">$4.56</div>
                </div>
                </BaseView>

                <BaseButton @click="nextStep">Create HODL Vault</BaseButton>
            </div>   
        </div>

        <div v-if="modalStep === 3">
            <div class="modal-items-cols">   
                <div class="modal-item-col">
                    <div style="display: flex; align-items: center; gap:20px">
                        <span class="success" />
                        <div class="modal-header-text">$TOKEN Vault Created!</div>
                    </div>
                    <div class="modal-sub-text">Now anyone can deposit funds into it, to support $TOKEN token hodlers!</div>
                </div>

                <div class="modal-item-col">
                    <div class="modal-sub-text">$TOKEN Vault Address</div>
                    <BaseView style="flex-direction: row; justify-content: space-between">
                        <div class="modal-sub-text">{{ tokenVaultAddress }}</div>
                        <span class="clipboard" @click="copyToClipboard(tokenVaultAddress)" />
                    </BaseView>
                    <div class="modal-sub-text">Anyone can donate funds to support $TOKEN token hodlers:</div>
                    <div class="modal-sub-text">&nbsp;&nbsp;&nbsp;&nbsp;• Send funds directly to the vault address<br>&nbsp;&nbsp;&nbsp;&nbsp;• Through Hodl Industries UI</div>
                </div>

                <BaseButton @click="closeModal" style="margin-top: 50px">Go to the Vault</BaseButton>
            </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { account, accountDetails, connect, disconnect } from '@kolirt/vue-web3-auth'

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const isVisible = ref(props.modelValue);
const modalStep = ref(1);
const tokenVaultAddress = ref('$TOKEN Vault Address');

function nextStep() {
  if(!account.connected) {
    alert('Connect a wallet to continue')
    closeModal()
    return
  }
  modalStep.value++;
}

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

</script>

<style scoped>
.kek {

}
</style>
