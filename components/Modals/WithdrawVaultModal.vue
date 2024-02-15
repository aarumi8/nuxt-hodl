<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div v-if="modalStep === 1">
          <div class="modal-items-cols">
            <div class="modal-item-col">
                <div class="modal-header-text">Burn $TOKEN to withdraw</div>
                <div class="modal-sub-text">By burning to withdraw, you burn $TOKEN token, and get a portion of the $TOKEN vault in exchange, not affecting the price of the $TOKEN token</div>
            </div>

            <div class="modal-item-col">
            <div class="modal-item-col">
                <BaseWithdrawView />
            </div>

            <BaseView>
                <div class="modal-items-col">  
                    <div class="modal-sub-text" style="margin-bottom: 10px">Maximum to receive</div>
                    <div class="modal-item-row" style="align-items:center">
                        <div class="modal-item-col" style="gap: 5px">
                            <div class="modal-header-text">$159</div>
                            <div class="modal-sub-text">32 different tokens</div>
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
                    <div class="modal-sub-header-text">$4.56</div>
                </div>
            </BaseView>
            </div>


            <BaseButton @click="nextStep">Choose tokens to withdraw</BaseButton>
          </div>
        </div>

        <div v-if="modalStep === 2">
            <div class="modal-items-cols">   
                <div class="modal-item-col">
                    <div class="modal-header-text">Select tokens to withdraw</div>
                    <div class="modal-sub-text">Keep in mind, that you’re withdrawing tokens at your own risk. Try not to choose tokens that are not verified, as this can lead to lost of funds</div>
                </div>

                <div class="modal-item-col">
                    <ViewsWithdrawSearchBar style="width: unset;" />
                    <ViewsWithdrawTokensList />
                </div>

            <BaseButton @click="nextStep">Approve Transaction</BaseButton>
            </div>   
        </div>

        <div v-if="modalStep === 3">
            <div class="modal-items-cols">   
                <div class="modal-item-col">
                    <div class="modal-header-text">Review</div>
                </div>

                <div class="modal-item-col">
                <BaseView>
                    <div class="modal-item-col">  
                        <div class="modal-sub-text">You burn</div>
                        <div class="modal-item-row" style="align-items:center">
                            <div class="modal-item-col" style="gap: 5px">
                                <div class="modal-header-text">15 $TOKEN</div>
                                <div class="modal-sub-text">$32</div>
                            </div>
                        </div>
                    </div>
                </BaseView>

                <BaseView>
                    <div class="modal-item-col">  
                        <div class="modal-sub-text">You receive</div>
                        <div class="modal-item-row" style="align-items:center">
                            <div class="modal-item-col" style="gap: 5px">
                                <div class="modal-header-text">$15</div>
                                <div class="modal-sub-text">32 different tokens</div>
                            </div>
                        </div>
                    </div>
                </BaseView>

                <BaseView>
                    <div class="modal-item-row">
                        <div class="modal-item-row" style="gap:10px; align-items:center">
                            <div class="modal-sub-header-text">$UNI =</div>
                            <div class="modal-sub-text">$1.3 (floor price)</div>
                        </div>
                        <div class="modal-sub-header-text">$4.56</div>
                    </div>
                </BaseView>
                </div>

                <BaseButton @click="closeModal">Proceed</BaseButton>
            </div>
        </div>

      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const isVisible = ref(props.modelValue);
const modalStep = ref(1);
const tokenVaultAddress = ref('$TOKEN Vault Address');
const imgSrc = ref("https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png")

function nextStep() {
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
