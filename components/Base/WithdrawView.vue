<template>
  <div class="custom-select">
    <div class="select-selected-with-view">
        <div class="modal-sub-text" style="margin-bottom: 10px">You burn</div>

        <div style="display: flex; justify-content: space-between; align-items: center">
        <div style="display: flex; align-items: center">
            <img v-if="selectedOption.imgSrc" :src="selectedOption.imgSrc" class="vault-image">
            {{ selectedOption.value ? selectedOption.label : placeholder }}
        </div>
        <div class="modal-sub-text">Balance: $159</div>
        </div>

    </div>

    <div class="select-selected-view">
        <div class="display: flex; flex-direction: column:">
            <input type="text" v-model="editableText" @focus="handleFocus" placeholder="Enter a value" class="modal-input" />
            <div class="modal-sub-text">$159</div>
        </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string;
  label: string;
  imgSrc?: string;
}

const options = ref<Option[]>([
  { value: "option1", label: "Option 1", balance: 100, imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png" },
  { value: "option2", label: "Option 2", balance: 200 },
  // Add more options here
]);

const placeholder = "Select a Token";
const selectedOption = ref<Option>({ value: "option1", label: "Option 1", balance: 100, imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png" });
const isOpen = ref(false);
const editableText = ref('');

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
    justify-content: space-between;
    background-color: rgb(32, 32, 32);
    border: 1px solid rgb(71, 71, 71);
    border-bottom: 0px;
    border-radius: 15px 15px 0px 0px;
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
