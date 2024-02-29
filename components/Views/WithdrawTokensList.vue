<template>
    <div class="withdraw-tokens-list">
        <div class="withdraw-tokens-item" v-for="(token, index) in tokens" :key="index">
            <div class="withdraw-small-row">
                <div @click="toggleSelection(token)" class="withdraw-select" :style="{ background: token.selected ? 'rgba(39,245,112,0.7)' : 'rgba(255, 255, 255, 0.10)' }"></div>
                <img :src="token.image" class="vault-image" style="transform: scale(1.8); margin-left: 20px">
                <div class="withdraw-small-col" style="margin-left: 10px">
                    <div class="withdraw-header-text">{{ token.name }}</div>
                    <div class="withdraw-sub-text">{{ token.ticker }}</div>
                </div>
            </div>

            <div class="withdraw-small-col">
                <div class="withdraw-header-text">{{ token.amount }}</div>
                <div class="withdraw-sub-text" style="text-align: right;">{{ token.total }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  tokens: [],
  modelValue?: Object
}>();

const emit = defineEmits(["update:modelValue"]);
const selectedTokens = ref([])

const toggleSelection = (token: any) => {
  token.selected = !token.selected
  if (token.selected) {
    selectedTokens.value.push(token)
  } else {
    const index = selectedTokens.value.findIndex((t: any) => t.id === token.id)
    if (index > -1) {
      selectedTokens.value.splice(index, 1)
    }
  }
  emit('update:modelValue', [...selectedTokens.value])
}
</script>

<style scoped>
.withdraw-tokens-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
        max-height: 300px; /* Adjust based on your needs */
    overflow-y: auto;
}
.withdraw-tokens-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.withdraw-small-row {
    display: flex;
    align-items: center;
}
.withdraw-small-col {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.withdraw-header-text {
color: #FFF;

font-family: Gilroy;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: normal;
}
.withdraw-sub-text {
color: #FFF;
opacity: 0.5;
text-align: left;
font-family: Gilroy;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: normal;
text-transform: uppercase;
}
.withdraw-select {
    width: 25px;
height: 25px;
border-radius: 5px;
border: 2px solid rgba(255, 255, 255, 0.50);
background: rgba(255, 255, 255, 0.10);
}
</style>