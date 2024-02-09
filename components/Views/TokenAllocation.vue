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
              borderRadius: '5px',
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
  const colors = [
    "#fff",
    "rgb(212,212,212)",
    "rgb(168,168,168)",
    "rgb(123,123,123)",
  ];

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
        backgroundColor: [
          "#fff",
          "rgb(212,212,212)",
          "rgb(168,168,168)",
          "rgb(123,123,123)",
        ],
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
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}

function drawChart() {
  if (!canvas.value) return;
  const ctx = canvas.value.getContext("2d");
  if (!ctx) return;

  canvas.value.height = canvas.value.width;
  const centerX = canvas.value.width / 2;
  const centerY = canvas.value.height / 2;
  const outerRadius = (canvas.value.height / 100) * 50;
  const innerRadius = (canvas.value.height / 100) * 30;
  let startAngle = 0;

  tokens.value.forEach((token: Token) => {
    const angle = (token.percentage / 100) * 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, startAngle, startAngle + angle);
    ctx.lineTo(centerX, centerY);
    ctx.fillStyle = token.color;
    ctx.fill();
    startAngle += angle;
  });

  // Making the inner circle transparent
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
  ctx.fill();

  // Reset globalCompositeOperation to default value
  ctx.globalCompositeOperation = "source-over";
}
</script>




<style scoped>
.token-chart {
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  width: 100%;
  max-height: 100vh;
  background: rgb(37, 37, 37);
  border-radius: 15px;
  border: 1px solid rgb(71, 71, 71);
  padding: 30px;
  gap: 20px;
}
.token-chart-text {
  color: #fff;
  font-size: 1.25rem;
  font-family: Gilroy;
  font-weight: 600;
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
