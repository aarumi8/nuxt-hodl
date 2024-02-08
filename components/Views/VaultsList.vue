<template>
  <div class="vaults-list">
    <table>
      <thead>
        <tr>
          <template v-for="(column, index) in columns" :key="index">
            <th v-if="index < 2">{{ column }}</th>
            <th v-else-if="index === columns.length - 1" class="desktop" style="text-align: right">{{ column }}</th>
            <th v-else-if="index === columns.length - 2" class="fmcap">{{ column }}</th>
            <th v-else class="desktop">{{ column }}</th>
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

            <td class="desktop">{{ vault.price }}</td>
            <td class="desktop">{{ vault.floorPrice }}</td>
            
            <td v-if="vault.mcap" class="desktop">{{ vault.mcap  }}</td>
            <td v-if="vault.amount" class="desktop">{{ vault.amount  }}</td>

            <td class="fmcap">
              <div class="fmcap-wrapper">
                <span v-if="vault.fmcap">{{ vault.fmcap }}</span>
                <span v-if="vault.value">{{ vault.value }}</span>
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
              <span v-if="vault.backedPercent">{{ vault.backedPercent }}</span>
              <span v-if="vault.exValue">{{ vault.exValue }}</span>
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
                <div class="cell" style="color: rgb(140, 140, 140)">{{columns[2]}}</div>
                <div class="cell" style="color: rgb(140, 140, 140)">
                  {{columns[3]}}
                </div>
                <div class="cell" style="color: rgb(140, 140, 140)">
                  {{columns[4]}}
                </div>
                <div class="cell" style="color: rgb(140, 140, 140)">
                  {{columns[5]}}
                </div>
                <div class="cell" style="color: rgb(140, 140, 140)">
                  {{columns[6]}}
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
                <div class="cell">{{ vault.price }}</div>
                <div class="cell">{{ vault.floorPrice }}</div>

                <div v-if="vault.mcap" class="cell">{{ vault.mcap }}</div>
                <div v-if="vault.fmcap" class="cell">{{ vault.fmcap }}</div>
                <div v-if="vault.backedPercent" class="cell">{{ vault.backedPercent }}</div>

                <div v-if="vault.amount" class="cell">{{ vault.amount }}</div>
                <div v-if="vault.value" class="cell">{{ vault.value }}</div>
                <div v-if="vault.exValue" class="cell">{{ vault.exValue }}</div>
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
  id: number;
  address: string;
  image: string;
  name: string;
  ticker: string;
  price: string;
  floorPrice: string;
  mcap: string;
  fmcap: string;
  backedPercent: string;
  amount: string,
  value: string,
  exValue: string
}

const props = defineProps({
  columns: Array,
  vaults: [Object],
});
const expandedVaultId = ref(null);
// Sample data structure for vaults, replace or fetch from your backend/api


async function toggleDetail(id: Number) {
  const vault = props.vaults.find((v: Vault) => v.id === id);
  if (!vault) return; // Exit if no vault found

  if (window.innerWidth > 868) {
    await navigateTo(`/vault/${vault.address}`);
  } else {
    expandedVaultId.value = expandedVaultId.value === id ? null : id;
  }
}
</script>

<style scoped>
.vaults-list {
  width: 100%;
  display: flex;
  flex-direction: column;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  font-weight: 700;
  color: rgb(140, 140, 140);
}

td,
th {
  border-top: 1px solid rgb(71, 71, 71);
  text-align: left;
  padding: 30px 30px;
  font-size: 1.25rem;
  font-family: "Gilroy";
  font-style: normal;
}

td {
  font-weight: 600;
  color: #fff;
}

.item:hover,
.item:active {
  background-color: rgba(255, 255, 255, 0.05);
  cursor: pointer;
}
.mobile-detail {
  display: none;
}
.mobile-detail-btn {
  display: none;
}
.empty-cell {
  padding-top: 15px;
  font-size: 1rem;
}
.cell {
  padding-top: 15px;
  font-size: 1rem;
}
tr:last-of-type td {
  border-bottom: 1px solid rgb(71, 71, 71); /* Adds bottom border to the last row */
}
.ticker {
  color: rgb(140, 140, 140);
  font-family: Gilroy;
  font-style: normal;
  font-weight: 500;
}
.vault-image {
  width: 24px;
  height: 24px;
  object-fit: cover; /* Ensure the image covers the area, adjust as needed */
  margin-right: 10px; /* Space between image and name */
  border-radius: 50%; /* Makes the image circular */
  background-color: #fff;
}
.expandVaultMobile {
  display: none;
}
.fmcap-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
@media (max-width: 1300px) {
  td,
  th {
    padding: 30px 15px;
  }
}
@media (max-width: 1100px) {
  td,
  th {
    padding: 30px 10px;
  }
}

@media (max-width: 868px) {
  .desktop {
    display: none;
  }
  .mobile-detail {
    display: flex;
    flex-direction: column;
  }
  .mobile-detail-btn {
    display: table-row;
    width: 100%;
  }
  .fmcap {
    text-align: right;
  }
  .fmcap-wrapper {
    justify-content: flex-end;
  }
  td,
  th {
    padding: 20px 10px;
    font-size: 1rem;
  }
  .expandVaultMobile {
    display: flex;
    width: 10px;
    height: 5px;
    margin-left: 5px;
    background-image: url("~/assets/expandMobileList.svg");
  }
}

@media (max-width: 500px) {
  td,
  th {
    padding: 20px 20px;
  }
}
</style>
