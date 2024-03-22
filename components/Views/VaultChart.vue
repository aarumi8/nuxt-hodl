<template>
  <div class="vault-chart-view">
    <div class="vault-chart-menu-desktop">
      <div class="vault-menu-item">
        <div :class="['menu-btn-item', { active: isPriceTab }]">Price</div>
        <div class="menu-btn-item">Market Cap</div>
      </div>

      <div class="vault-menu-item">
        <div class="menu-item-rect" style="backgroundColor: #CA9823" />
        <div class="menu-btn-item" style="padding-left: 5px; pointer-events: none">Price</div>

        <div style="margin-right: 5px" />

        <div
          class="menu-item-rect"
          style="backgroundColor: #438737"
        />
        <div class="menu-btn-item" style="padding-left: 5px; pointer-events: none">Floor Price</div>
      </div>

      <div class="vault-menu-item">
        <div :class="['menu-btn-item', { active: isTimeTab === 1 }]">1D</div>
        <div :class="['menu-btn-item', { active: isTimeTab === 7 }]">7D</div>
        <div :class="['menu-btn-item', { active: isTimeTab === 30 }]">1M</div>
        <div :class="['menu-btn-item', { active: isTimeTab === 365 }]">1Y</div>
        <div :class="['menu-btn-item', { active: isTimeTab === 0 }]">All</div>
      </div>
    </div>

    <div class="vault-chart-menu-mobile">
      <div class="vault-menu-item">
        <div :class="['menu-btn-item', { active: isTimeTab === 1 }]">1D</div>
        <div :class="['menu-btn-item', { active: isTimeTab === 7 }]">7D</div>
        <div :class="['menu-btn-item', { active: isTimeTab === 30 }]">1M</div>
        <div :class="['menu-btn-item', { active: isTimeTab === 365 }]">1Y</div>
        <div :class="['menu-btn-item', { active: isTimeTab === 0 }]">All</div>
      </div>

      <div class="vault-menu-item">
        <div class="menu-item-rect" style="backgroundColor: #CA9823" />
        <div class="menu-btn-item" style="padding-left: 5px; pointer-events: none">Price</div>

        <div style="margin-right: 5px" />

        <div
          class="menu-item-rect"
          style="backgroundColor: #438737"
        />
        <div class="menu-btn-item" style="padding-left: 5px; pointer-events: none">Floor Price</div>
      </div>
    </div>

    <div class="vault-chart noise-chart">
      <div style="position: relative; display: flex; width: 100%; justify-content: center; align-content: center; align-items: end;">
        <canvas style="width: 100%; height: 100%; margin-bottom: -1%; transform: scale(1.001)" ref="canvas"></canvas>
      </div>
    </div>

    <div class="vault-chart-menu-mobile" style="justify-content: center !important;">
      <div class="vault-menu-item">
        <div :class="['menu-btn-item', { active: isPriceTab }]">Price</div>
        <div class="menu-btn-item">Market Cap</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import gradient from "chartjs-plugin-gradient";
import 'chartjs-plugin-style';
Chart.register(gradient);
const canvas = ref<HTMLCanvasElement | null>(null);
var isPriceTab = ref(true);
var isTimeTab = ref(1);

onMounted(() => {
  createCanvas();
});
function createCanvas() {
  if (!canvas.value) return;

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"], // Your labels array (months)
    datasets: [
      {
        label: "Price", // Name of the first dataset
        data: [65, 59, 80, 81, 56, 55, 40], // Data for the first dataset
        borderColor: "#CA9823", // Color of the first line
        borderWidth: 1,
        backgroundColor:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.00) 100%)",
        fill: true,
        tension: 0,
        pointRadius: 20,
        pointBorderColor: "rgba(0, 0, 0, 0)",
        pointBackgroundColor: "rgba(0,0,0,0)",
        gradient: {
          backgroundColor: {
            axis: "y",
            colors: {
              0: "rgba(202, 152, 35, 0.10)",
              100: "rgba(202, 152, 35, 0.60)",
            },
          },
        },
      },
      {
        label: "Floor Price", // Name of the second dataset
        data: [28, 48, 40, 19, 86, 90, 27], // Data for the second dataset
        borderColor: "#438737", // Color of the second line
        borderWidth: 1,
        backgroundColor:
          "linear-gradient(180deg, rgba(67, 135, 55, 0.40) 0%, rgba(67, 135, 55, 0.00) 100%)",
        fill: true,
        // borderDash: [10, 10], // Creates a dashed line ([dash length, space length])
        tension: 0,
        pointRadius: 20,
        pointBorderColor: "rgba(0, 0, 0, 0)",
        pointBackgroundColor: "rgba(0,0,0,0)",
        gradient: {
          backgroundColor: {
            axis: "y",
            colors: {
              0: "rgba(67, 255, 55, 0.40)",
              100: "rgba(67, 135, 55, 0.00)",
            },
          },
        },
      },
    ],
  };

  // Create the line chart
  new Chart(canvas.value.getContext("2d"), {
    type: "line",
    data: data,
    maintainAspectRatio: false,

    options: {
      animation : {
        duration: 0
      },
      layout: {
        autoPadding: false,
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          display: false,
          ticks: {
            display: false,
            align: "inner",
          },
          grid: {
            display: false, // This will hide the grid lines for the x-axis
          },
        },
        y: {
          display: true,
          beginAtZero: true,
          position: "right",
          ticks: {
            mirror: true,
            padding: -4,
            labelOffset: 10,
            color: "white",
            font: {
              family: 'Gilroy'
            }
          },
          grid: {
            display: false, // This will hide the grid lines for the y-axis
          },
        },
      },
    },
  });
}
</script>

<style scoped>
.vault-chart-view {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.vault-chart {
  display: flex;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 3px;
  overflow: hidden;
  height: 90%;
}
.vault-chart-menu-desktop {
  display: flex;
  height: 10%;
  justify-content: space-between;
}
.vault-menu-item {
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 5px;
  align-items: center;
  gap: 2px;
}
.vault-chart-menu-mobile {
  display: none;
  height: 10%;
  justify-content: space-between;
}
.menu-btn-item.active {
  background: rgba(255, 255, 255);
  color: black;
  border-radius: 1px;
}
@media(hover:hover) {
  .menu-btn-item:hover {
  background: rgba(255, 255, 255);
  color: black;
  border-radius: 1px;
}
}
.menu-btn-item:active {
  background: rgba(255, 255, 255);
  color: black;
  border-radius: 1px;
}
.menu-btn-item {
  background: rgba(255, 255, 255, 0);
  padding: 5px 10px;
  display: flex;
  color: #fff;
  font-family: Gilroy;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  align-items: center;
  cursor: pointer;
}
.menu-item-rect {
  border-radius: 1px;
  width: 17px;
  height: 17px;
}

@media (max-width: 1300px) {
  .vault-chart {
 
  }
  .vault-chart-menu-desktop {
    display: none;
  }
  .vault-chart-menu-mobile {
    display: flex;
    height: unset;
  }
}

@media (max-width: 450px) {
  .menu-btn-item {
    font-size: 8px;
  }
}
</style>