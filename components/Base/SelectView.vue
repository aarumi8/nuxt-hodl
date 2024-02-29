<template>
  <div class="custom-select">
    <div v-if="!selectedOption.value" class="select-selected" @click="toggleDropdown">
        <div style="display: flex; align-items: center">
            <img v-if="selectedOption.imgSrc" :src="selectedOption.imgSrc" class="vault-image">
            {{ selectedOption.value ? selectedOption.label : placeholder }}
        </div>
      <span class="expand-select-item" />
    </div>

    <div v-if="selectedOption.value" class="select-selected-with-view" @click="toggleDropdown">
        <div style="display: flex; align-items: center">
            <img v-if="selectedOption.imgSrc" :src="selectedOption.imgSrc" class="vault-image">
            {{ selectedOption.value ? selectedOption.label : placeholder }}
            <span style="margin-left:10px" class="expand-select-item" />
        </div>
        <div class="modal-sub-text">Balance: {{parseFloat(selectedOption.balanceFormatted).toFixed(2)}}</div>
    </div>

    <div class="select-selected-view" v-if="selectedOption.value">
        <div class="display: flex; flex-direction: column:">
            <input type="text" v-model="selectedOption.amountInput" @focus="handleFocus" placeholder="Enter a value" class="modal-input" />
            <div class="modal-sub-text">${{(selectedOption.amountInput * selectedOption.price).toFixed(2)}}</div>
        </div>
    </div>
    
    <div v-if="isOpen" class="select-items">
      <div
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
        class="select-item"
      >
        <div>{{ option.label }}</div>
        <div style="opacity: 0.5">{{ option.balanceFormatted }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, watch } from 'vue';

interface Option {
  value: string;
  label: string;
  address: string;
  balance: string;
  imgSrc?: string;
  amountInput: string;
  decimals: number;
}

const props = defineProps<{
  options: Option[];
  modelValue?: Option;
}>();

const emit = defineEmits(["update:modelValue"]);

const placeholder = "Select a Token";
const isOpen = ref(false);

// Make selectedOption reactive. Initialize with a fallback to ensure it's always an object.
const selectedOption = reactive<Option | {}>(props.modelValue || {});

// Watch for changes to props.modelValue and update selectedOption accordingly
watch(() => props.modelValue, (newValue) => {
  Object.assign(selectedOption, newValue);
}, { deep: true });

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectOption(option: Option) {
  Object.assign(selectedOption, option);
  emit('update:modelValue', selectedOption)
  isOpen.value = false;
}

const handleFocus = (event: FocusEvent) => {
    const input = event.target as HTMLInputElement;
    const valLength = input.value.length;
    input.setSelectionRange(valLength, valLength);
};
</script>

<style scoped>
.custom-select {
  position: relative;
  user-select: none;
  background-color: rgb(32, 32, 32);
  border-radius: 15px;
}

.select-selected {
  display: flex; 
  align-items: center;
  justify-content: space-between;
  background-color: rgb(32, 32, 32);
  border: 1px solid rgb(71, 71, 71);
  border-radius: 15px;
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
    align-items: center;
    justify-content: space-between;
    background-color: rgb(32, 32, 32);
    border: 1px solid rgb(71, 71, 71);
    border-bottom: 0px;
    border-radius: 15px 15px 0px 0px;
    padding: 20px;
    cursor: pointer;
    color: #fff;

    font-family: Gilroy;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.select-items {
  position: absolute;
  background-color: rgb(32, 32, 32);
  border-radius: 15px;
  border: 1px solid rgb(71, 71, 71);
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
    border-radius: 0px 0px 15px 15px;
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
    border: 0px solid rgb(71, 71, 71); /* Example border */
    text-decoration: none;
    outline: none;
    margin-bottom: 5px;
    padding: 0px;
}
.modal-header-input::placeholder {
  opacity: 0.5;
}
</style>
