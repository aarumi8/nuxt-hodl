<template>
  <div class="custom-select">
    <div class="select-selected-with-view">
      <div class="modal-sub-text" style="margin-bottom: 10px">You burn</div>

      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div style="display: flex; align-items: center">
          <img v-if="vault.image" :src="vault.image" class="vault-image" />
          {{ vault.ticker }}
        </div>
        <div class="modal-sub-text">Balance: {{primaryToken.balanceFormatted}}</div>
      </div>
    </div>

    <div class="select-selected-view">
      <div class="display: flex; flex-direction: column:">
        <input
          type="text"
          v-model="editableText"
          @focus="handleFocus"
          placeholder="Enter a value"
          class="modal-input"
        />
        <div class="modal-sub-text">{{price}}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string;
  label: string;
  address: string;
  balance: string;
  imgSrc?: string;
  amountInput: string;
  decimals: Number;
}

const props = defineProps<{
  vault: Object;
  modelValue: String;
  primaryToken: Object;
}>();

const emit = defineEmits(["update:modelValue"]);
const price = ref('')
const isOpen = ref(false);
const editableText = ref(props.modelValue);

watch(
  editableText,
  (newValue: String) => {
    emit("update:modelValue", newValue);
    price.value = (newValue * props.vault.price).toFixed(2)
  },
  { immediate: true }
);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectOption(option: Option) {
  selectedOption.value = option;
  isOpen.value = false;
}

const handleFocus = (event: FocusEvent) => {
  const input = event.target as HTMLInputElement;
  // This sets the cursor position to the end of the text
  const valLength = input.value.length;
  input.setSelectionRange(valLength, valLength);
  // Alternatively, to set the cursor at the beginning, use:
  // input.setSelectionRange(0, 0);
};
</script>

<style scoped>
.custom-select {
  position: relative;
  user-select: none;
  background-color: rgb(32, 32, 32);
  border-radius: 3px;
}

.select-selected {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(32, 32, 32);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 3px;
  padding: 20px;
  cursor: pointer;
  color: #fff;

  font-family: Gilroy;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.select-selected-with-view {
  display: flex;
  justify-content: space-between;
  background-color: rgb(32, 32, 32);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-bottom: 0px;
  border-radius: 3px 3px 0px 0px;
  padding: 20px;
  cursor: pointer;
  color: #fff;
  flex-direction: column;
  font-family: Gilroy;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.select-items {
  position: absolute;
  background-color: rgb(32, 32, 32);
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  width: 100%;
  z-index: 99;
  color: #fff;
  font-family: Gilroy;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  overflow-y: auto;
  max-height: 300px;
}

.select-item {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.select-item:hover {
  opacity: 0.5;
}

.expand-select-item {
  display: flex;
  width: 18px;
  height: 10px;
  background-image: url("~/assets/expandSelect.svg");
}

.select-selected-view {
  display: flex;
  padding: 20px;
  border-right: 1px solid rgb(71, 71, 71);
  border-left: 1px solid rgb(71, 71, 71);
  border-bottom: 1px solid rgb(71, 71, 71);
  border-radius: 0px 0px 3px 3px;
  padding-top: 0px;
}
.modal-input {
  /* Styles to match your design, e.g., font size, border, etc. */
  font-family: Gilroy;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: #fff;
  background-color: rgb(32, 32, 32); /* Match the modal's background */
  border: 0px solid rgba(255, 255, 255, 0.25); /* Example border */
  text-decoration: none;
  outline: none;
  margin-bottom: 5px;
  padding: 0px;
}
.modal-header-input::placeholder {
  opacity: 0.5;
}
</style>
