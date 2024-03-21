<template>
  <div class="custom-select">
    <div class="select-selected" @click="toggleDropdown">
        <div style="display: flex; align-items: center">
            <img v-if="selectedOption.image" :src="selectedOption.image" class="vault-image">
            {{ selectedOption.value ? selectedOption.label : placeholder }}
        </div>
      <span class="expand-select-item" />
    </div>
    <div v-if="isOpen" class="select-items">
      <div
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
        class="select-item"
      >
      <img v-if="option.image" :src="option.image" class="vault-image">
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string;
  label: string;
  address: string;
  image?: string;
}

const props = defineProps<{
  options: Option[];
  modelValue?: Option;
}>();

const emit = defineEmits(["update:modelValue"]);

const options = props.options

const placeholder = "Select a Token";
var selectedOption = props.modelValue;
const isOpen = ref(false);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectOption(option: Option) {
  selectedOption = option;
  emit('update:modelValue', selectedOption)
  isOpen.value = false;
}
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
  background-color: rgba(255, 255, 255, 0.25);
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
  padding: 20px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-content: center;
  align-items: center;
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
</style>
