<template>
  <div class="token-chart">
    <div class="token-chart-text">Token Allocation</div>
    <div style="position: relative; display: flex; width: 100%">
      <canvas style="width: 100%; height: 100%" ref="canvas"></canvas>
    </div>

    <div class="token-details">
      <div v-for="token in tokens" :key="token.name" class="token-details-row">
        <div style="display: flex">
          <div
            :style="{
              width: '17px',
              height: '17px',
              backgroundColor: token.color,
              marginRight: '5px',
              borderRadius: '1px',
            }"
          ></div>
          <div class="token-chart-text" style="font-size: 0.925rem !important">
            {{ token.name }}
          </div>
        </div>
        <div class="token-chart-text" style="font-size: 0.925rem !important">
          {{ token.percentage }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
Chart.register(...registerables);

interface Token {
  name: string;
  percentage: number;
  color: string;
}

const props = defineProps({
  tokens: Array,
});

var tokens = ref<Token[]>(props.tokens);

const canvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  sortTokens();
  createCanvas();
});

function sortTokens() {
  // Sort tokens by percentage and apply new colors
  const sortedTokens = [...tokens.value].sort(
    (a, b) => b.percentage - a.percentage
  );
  const colors = ["#438737", "#CA9823", "#2352CA", "#723787"];

  // Update each token with a new color based on the new order
  const updatedTokens = sortedTokens.map((token, index) => ({
    ...token,
    color: colors[index] || token.color, // Assign new color based on index
  }));

  // Update the reactive tokens array to trigger reactivity
  tokens.value = updatedTokens;
}

function createCanvas() {
  if (!canvas.value) return;

  // Prepare data for Chart.js
  const data = {
    labels: tokens.value.map((token: Token) => token.name),
    datasets: [
      {
        data: tokens.value.map((token: Token) => token.percentage),
        backgroundColor: ["#438737", "#CA9823", "#2352CA", "#723787"],
        hoverOffset: 4,
        borderWidth: [0],
      },
    ],
  };

  // Create the donut chart
  new Chart(canvas.value.getContext("2d"), {
    type: "doughnut",
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: {
        duration: 0,
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}
</script>

<style scoped>
.token-chart {
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  width: 100%;

  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 30px;
  gap: 20px;
  box-shadow: 0px 9px 19px 0px rgba(0, 0, 0, 0.20), 0px 35px 35px 0px rgba(0, 0, 0, 0.17), 0px 79px 47px 0px rgba(0, 0, 0, 0.10), 0px 141px 56px 0px rgba(0, 0, 0, 0.03), 0px 220px 62px 0px rgba(0, 0, 0, 0.00);
}
.token-chart-text {
  color: #fff;
  font-size: 1.25rem;
  font-family: Gilroy;
  font-weight: 500;
  font-style: normal;
  line-height: normal;
}
.token-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.token-details-row {
  display: flex;
  justify-content: space-between;
}
</style>
