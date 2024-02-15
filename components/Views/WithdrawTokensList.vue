<template>
    <div class="withdraw-tokens-list">
        <div class="withdraw-tokens-item" v-for="(token, index) in tokens" :key="index">
            <div class="withdraw-small-row">
                <div @click="toggleSelection(token)" class="withdraw-select" :style="{ background: token.selected ? 'rgba(39,245,112,0.7)' : 'rgba(255, 255, 255, 0.10)' }"></div>
                <img :src="token.imgSrc" class="vault-image" style="transform: scale(1.8); margin-left: 20px">
                <div class="withdraw-small-col" style="margin-left: 10px">
                    <div class="withdraw-header-text">{{ token.header }}</div>
                    <div class="withdraw-sub-text">{{ token.subText }}</div>
                </div>
            </div>

            <div class="withdraw-small-col">
                <div class="withdraw-header-text">{{ token.amount }}</div>
                <div class="withdraw-sub-text" style="text-align: right;">{{ token.value }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const tokens = ref([
  {
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
    header: "Bitcoin",
    subText: "BTC",
    amount: "1",
    value: "$50,000",
    selected: false
  },
  // Add more tokens as needed
  {
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
    header: "Ethereum",
    subText: "ETH",
    amount: "2",
    value: "$4,000",
    selected: false
  },
    {
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
    header: "Ethereum",
    subText: "ETH",
    amount: "2",
    value: "$4,000",
    selected: false
  },
    {
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
    header: "Ethereum",
    subText: "ETH",
    amount: "2",
    value: "$4,000",
    selected: false
  },
    {
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
    header: "Ethereum",
    subText: "ETH",
    amount: "2",
    value: "$4,000",
    selected: false
  }
])

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
text-align: right;
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