<template>
  <div class="vaults-list tokens-list" id="tokensList">
    <table>
      <thead>
        <tr>
          <template v-for="(column, index) in columns" :key="index">
            <th v-if="index < 2">{{ column }}</th>
            <th
              v-else-if="index === columns.length - 1"
              class="fmcap"
              style="border-right: 0px"
            >
              {{ column }}
            </th>
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

            <td class="desktop">${{ vault.price }}</td>
            <td class="desktop">{{ vault.amount }}</td>

            <td class="fmcap">
              <div class="fmcap-wrapper">
                <span>${{ vault.total }}</span>
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
          </tr>

          <tr v-if="expandedVaultId === vault.id">
            <td style="border-top: 0px; padding-top: 0px !important">
              <div class="mobile-detail">
                <div class="cell" style="opacity: 0">P</div>
                <div class="cell" style="opacity: 0">F</div>
                <div class="cell" style="opacity: 0">M</div>
              </div>
            </td>

            <td style="border-top: 0px; padding-top: 0px !important">
              <div class="mobile-detail">
                <div class="cell" style="color: rgb(140, 140, 140)">
                  {{ columns[2] }}
                </div>
                <div class="cell" style="color: rgb(140, 140, 140)">
                  {{ columns[3] }}
                </div>
                <div class="cell" style="color: rgb(140, 140, 140)">
                  {{ columns[4] }}
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
                <div class="cell">{{ vault.amount }}</div>
                <div class="cell">${{ vault.total }}</div>
              </div>
            </td>
          </tr>

          <tr v-if="expandedVaultId === vault.id" class="mobile-detail-btn">
            <td style="border-top: 0px; padding: 0px 0px 15px 0px" colspan="3">
              <nuxt-link
                style="text-decoration: none"
                target="_blank"
                :to="
                  vault.address ===
                  '0x0000000000000000000000000000000000000000000000000000000000000000'
                    ? 'https://coinmarketcap.com/currencies/ethereum/'
                    : `https://etherscan.io/address/${vault.address}`
                "
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
    <section v-if="!vaults.length">
      <BaseSubText
        sub-text="There are no tokens in the vault"
        sub-text-active=""
      />
    </section>
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
  amount: string;
  value: string;
  exValue: string;
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
    if (
      vault.address ===
      "0x0000000000000000000000000000000000000000000000000000000000000000"
    ) {
      await navigateTo("https://coinmarketcap.com/currencies/ethereum/", {
        external: true,
        open: { target: "_blank" },
      });
    } else {
      await navigateTo(`https://etherscan.com/address/${vault.address}`, {
        external: true,
        open: { target: "_blank" },
      });
    }
  } else {
    expandedVaultId.value = expandedVaultId.value === id ? null : id;
  }
}
</script>

<style scoped>
.tokens-list {
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding-left: 20px;
  padding-right: 20px;
  box-shadow: 0px 9px 19px 0px rgba(0, 0, 0, 0.2),
    0px 35px 35px 0px rgba(0, 0, 0, 0.17), 0px 79px 47px 0px rgba(0, 0, 0, 0.1),
    0px 141px 56px 0px rgba(0, 0, 0, 0.03), 0px 220px 62px 0px rgba(0, 0, 0, 0);
}

@media (max-width: 868px) {
  .tokens-list {
    border: 0px;
    overflow: visible;
    background-color: rgba(0, 0, 0, 0);
    padding: 0px;
    box-shadow: unset;
  }
}
</style>
