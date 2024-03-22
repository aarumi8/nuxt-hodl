<template>
  <div class="vaults-list">
    <table>
      <thead>
        <tr>
          <template v-for="(column, index) in columns" :key="index">
            <th v-if="index < 2">{{ column }}</th>
            <th
              v-else-if="index === columns.length - 1"
              class="desktop"
              style="text-align: right; padding: 30px 0px 30px 30px"
            >
              {{ column }}
              <span
                class="info"
                :data-title="tips[index]"
                style="margin-left: -7px"
              ></span>
            </th>
            <th
              v-else-if="index === columns.length - 2"
              class="fmcap"
              style="border-right: 0px"
            >
              {{ column }}
              <span
                :data-title="tips[index]"
                class="info"
                style="margin-left: -7px"
              ></span>
            </th>
            <th v-else class="desktop">
              {{ column }}<span :data-title="tips[index]" class="info"></span>
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <template v-for="(vault, index) in vaults" :key="vault.id">
          <tr class="item" @click="toggleDetail(vault.id)">
            <td>
              {{ index + 1 }}
            </td>
            <td>
              <div style="display: flex; align-items: center">
                <img :src="vault.image" class="vault-image" />
                <div>
                  {{ vault.name }}
                  <span class="ticker">{{ vault.ticker }}</span>
                </div>
              </div>
            </td>

            <td class="desktop">${{ vault.price }}</td>
            <td class="desktop">${{ vault.floorPrice }}</td>

            <td v-if="vault.mcap" class="desktop">
              {{ formatBalance(vault.mcap) }}
            </td>
            <td v-if="vault.amount" class="desktop">{{ vault.amount }}</td>

            <td class="fmcap">
              <div class="fmcap-wrapper">
                <span v-if="vault.fmcap">${{ vault.fmcap }}</span>
                <span v-if="vault.value">{{
                  formatBalance(parseFloat(vault.value))
                }}</span>
                <span
                  v-if="expandedVaultId === vault.id"
                  class="expandVaultMobile"
                ></span>
                <span
                  v-else
                  class="expandVaultMobile"
                  style="transform: rotate(-180deg)"
                ></span>
              </div>
            </td>

            <td class="desktop" style="text-align: right">
              <span v-if="vault.backedPercent">{{ vault.backedPercent }}%</span>
              <span v-if="vault.exValue">${{ vault.exValue }}</span>
            </td>
          </tr>

          <tr v-if="expandedVaultId === vault.id">
            <td style="border-top: 0px; padding-top: 0px !important">
              <div class="mobile-detail">
                <div class="cell" style="opacity: 0">P</div>
                <div class="cell" style="opacity: 0">F</div>
                <div class="cell" style="opacity: 0">M</div>
                <div class="cell" style="opacity: 0">F</div>
                <div class="cell" style="opacity: 0">B</div>
              </div>
            </td>

            <td style="border-top: 0px; padding-top: 0px !important">
              <div class="mobile-detail">
                <div class="cell" style="color: rgb(140, 140, 140)">
                  {{ columns[2] }}
                  <span :data-title="tips[2]" class="info"></span>
                </div>
                <div class="cell" style="color: rgb(140, 140, 140)">
                  {{ columns[3] }}
                  <span :data-title="tips[3]" class="info"></span>
                </div>
                <div class="cell" style="color: rgb(140, 140, 140)">
                  {{ columns[4] }}
                  <span :data-title="tips[4]" class="info"></span>
                </div>
                <div class="cell" style="color: rgb(140, 140, 140)">
                  {{ columns[5] }}
                  <span :data-title="tips[5]" class="info"></span>
                </div>
                <div class="cell" style="color: rgb(140, 140, 140)">
                  {{ columns[6] }}
                  <span :data-title="tips[6]" class="info"></span>
                </div>
              </div>
            </td>

            <td
              style="
                border-top: 0px;
                text-align: right;
                padding-top: 0px !important;
              "
            >
              <div class="mobile-detail">
                <div class="cell">${{ vault.price }}</div>
                <div class="cell">${{ vault.floorPrice }}</div>

                <div v-if="vault.mcap" class="cell">
                  {{ formatBalance(vault.mcap) }}
                </div>
                <div v-if="vault.fmcap" class="cell">${{ vault.fmcap }}</div>
                <div v-if="vault.backedPercent" class="cell">
                  {{ vault.backedPercent }}%
                </div>

                <div v-if="vault.amount" class="cell">{{ vault.amount }}</div>
                <div v-if="vault.value" class="cell">
                  {{ formatBalance(parseFloat(vault.value)) }}
                </div>
                <div v-if="vault.exValue" class="cell">
                  ${{ vault.exValue }}
                </div>
              </div>
            </td>
          </tr>

          <tr v-if="expandedVaultId === vault.id" class="mobile-detail-btn">
            <td style="border-top: 0px; padding: 0px 0px 15px 0px" colspan="3">
              <nuxt-link
                style="text-decoration: none"
                :to="`/vault/${vault.address}`"
              >
                <CustomButtonsLearnMoreButton
                  buttonColor="rgb(48, 48, 48)"
                  buttonText="Learn more"
                  textColor="#fff"
                  border="1px solid rgb(104,104,104)"
                />
              </nuxt-link>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>


<script setup lang="ts">
// Define an interface for vault objects
interface Vault {
  id: string;
  address: string;
  image: string;
  name: string;
  ticker: string;
  price: string;
  floorPrice: string;
  mcap: string;
  fmcap: string;
  backedPercent: string;
  amount: string;
  value: string;
  exValue: string;
}

const props = defineProps({
  columns: Array,
  vaults: [Object],
  tips: Array,
});
const expandedVaultId = ref(null);
// Sample data structure for vaults, replace or fetch from your backend/api

async function toggleDetail(id: String) {
  const vault = props.vaults.find((v: Vault) => v.id === id);
  if (!vault) return; // Exit if no vault found

  if (window.innerWidth > 868) {
    await navigateTo(`/vault/${vault.address}`, {
      open: { target: "_blank" },
    });
  } else {
    expandedVaultId.value = expandedVaultId.value === id ? null : id;
  }
}

function formatBalance(totalBalance: any) {
  if (totalBalance >= 1_000_000) {
    // Checks if the totalBalance is equal to or greater than 1 million
    return "$" + (totalBalance / 1_000_000).toFixed(2) + "M";
  } else if (totalBalance >= 100_000) {
    // Checks if the totalBalance is equal to or greater than 100 thousand
    return "$" + (totalBalance / 1_000).toFixed(2) + "k";
  } else {
    return "$" + totalBalance.toFixed(2);
  }
}
</script>

<style scoped>
.info {
  z-index: 10;
  width: 14px;
  height: 14px;
  background-image: url("~/assets/info.svg");
  display: inline-block;
  margin-left: 5px;
  position: relative;
  cursor: pointer;
}

@media (hover: hover) {
  .info:hover::after {
    content: attr(data-title);
    padding: 5px;
    border-radius: 3px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    width: 10vw;
    position: absolute;
    top: 25px;
    right: 5px;
    background: rgb(140, 140, 140);
    color: white;
    font-size: 0.875rem;
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 300;
    text-align: left;
    z-index: 101;
  }
}

.info:active::after {
  content: attr(data-title);
  padding: 5px;
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  width: 10vw;
  position: absolute;
  top: 25px;
  right: 5px;
  background: rgb(140, 140, 140);
  color: white;
  font-size: 0.875rem;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 300;
  text-align: left;
  z-index: 101;
}

@media (max-width: 767px) {
  @media (hover: hover) {
    .info:hover::after {
      width: 30vw;
      right: 5px;
      left: unset;
      top: 25px;
    }
    .info:hover::after {
      width: 30vw;
      right: 0px;
      left: 20px;
      top: -15px;
    }
  }
  .fmcap .info:active::after {
    width: 30vw;
    right: 5px;
    left: unset;
    top: 25px;
  }
  .info:active::after {
    width: 30vw;
    right: 0px;
    left: 20px;
    top: -15px;
  }
  .info {
    margin-left: 0px;
  }
}
</style>
