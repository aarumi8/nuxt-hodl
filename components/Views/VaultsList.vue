<template>
  <div class="vaults-list">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th class="desktop">Price</th>
          <th class="desktop">Floor Price</th>
          <th class="desktop">Market Cap</th>
          <th class="fmcap">Floor Market Cap</th>
          <th class="desktop" style="text-align: right">Backed %</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(vault, index) in vaults" :key="vault.id">
          <tr class='item' @click="toggleDetail(vault.id)">
            <td>
              {{ index + 1 }}
              <div v-if="expandedVaultId === vault.id" class="mobile-detail">
                <div class="cell" style="opacity: 0">P</div>
                <div class="cell" style="opacity: 0">F</div>
                <div class="cell" style="opacity: 0">M</div>
                <div class="cell" style="opacity: 0">F</div>
                <div class="cell" style="opacity: 0">B</div>
              </div>
            </td>
            <td>
              {{ vault.name }}
              <div v-if="expandedVaultId === vault.id" class="mobile-detail">
                <div class="cell">Price</div>
                <div class="cell">Floor Price</div>
                <div class="cell">Market Cap</div>
                <div class="cell">Floor Market Cap</div>
                <div class="cell">Backed %</div>
              </div>
            </td>
            <td class="desktop">{{ vault.price }}</td>
            <td class="desktop">{{ vault.floorPrice }}</td>
            <td class="desktop">{{ vault.mcap }}</td>
            <td class="fmcap">
              {{ vault.fmcap }}
              <div v-if="expandedVaultId === vault.id" class="mobile-detail">
                <div class="cell">{{ vault.price }}</div>
                <div class="cell">{{ vault.floorPrice }}</div>
                <div class="cell">{{ vault.mcap }}</div>
                <div class="cell">{{ vault.fmcap }}</div>
                <div class="cell">{{ vault.backedPercent }}</div>
              </div>
            </td>
            <td class="desktop" style="text-align: right">
              {{ vault.backedPercent }}
            </td>
          </tr>
          <tr v-if="expandedVaultId === vault.id" class="mobile-detail-btn">
            <td style="border-top: 0px; padding: 0px 0px 15px 0px" colspan="3">
              <CustomButtonsLearnMoreButton
                buttonColor="rgb(48, 48, 48)"
                buttonText="Learn more"
                textColor="#fff"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>


<script setup lang="js">
const expandedVaultId = ref(null);
// Sample data structure for vaults, replace or fetch from your backend/api
const vaults = [
  { id: 1, name: 'Vault A', price: '$100', floorPrice: '$90', mcap: '$1M', fmcap: '$900K', backedPercent: '90%' },
  { id: 2, name: 'Vault A', price: '$100', floorPrice: '$90', mcap: '$1M', fmcap: '$900K', backedPercent: '90%' },
  // Add more vault items as needed
];

function toggleDetail(id) {
  expandedVaultId.value = expandedVaultId.value === id ? null : id;
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
  td,
  th {
    padding: 20px 10px;
    font-size: 1rem;
  }
}
</style>
