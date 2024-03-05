<template>
  <div class="search-bar">
    <span class="search-icon"></span>
    <input
      type="text"
      placeholder="Search by token"
      v-model="searchQuery"
      @input="handleSearch"
    />
    <div class="search-results" v-if="searching || searchResults">
      <div v-if="searching" class="loading">Loading...</div>
      <div v-else-if="searchResults?.found" class="result">
        <nuxt-link :to="`/vault/${searchResults.tokenAddress}`"
          >searchResults.tokenName</nuxt-link
        >
      </div>
      <div v-else class="not-found">Not found</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref("");
const searchResults = ref(null);
const searching = ref(false);

onMounted(() => {
  const onClickOutside = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).closest(".search-bar")) {
      searchResults.value = null;
    }
  };
  window.addEventListener("click", onClickOutside);

  // Cleanup event listener on component unmount
  onUnmounted(() => {
    window.removeEventListener("click", onClickOutside);
  });
});

// Handle search logic, potentially adding lodash debounce in the future
const handleSearch = () => {
  if (!searchQuery.value) {
    searchResults.value = null;
    return;
  }
  searching.value = true;
  // Simulate an API call to search for the token
  const results = "Simulated search result"; // Replace with actual search logic
  searchResults.value = results;
  searching.value = false;
};
</script>


<style scoped>
.search-bar {
  display: flex;
  position: relative;
  width: 100%;
  padding: 20px 24px;
  align-items: center;
  gap: 10px;
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  box-shadow: 4px 4px 5px 0px rgba(0, 0, 0, 0.20) inset, 5px 5px 4px 0px rgba(0, 0, 0, 0.30);
  background: rgba(255, 255, 255, 0.1);
}

.search-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  background-image: url("~/assets/searchIcon.svg");
}
.search-bar input {
  background: transparent;
  border: none;
  color: #fff;
  font-family: "Gilroy", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  width: 100%;
}

input:focus {
  outline: none;
}
.search-results {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  left: -1px;
  top: 103%;
  background: rgb(48, 48, 48);
  overflow: hidden;
  z-index: 10;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.loading,
.result,
.not-found {
  padding: 20px 24px;
  color: #fff;
  font-family: "Gilroy", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  z-index: 10;
}

.result a {
  color: #007bff; /* Adjust color as needed */
}
@media (max-width: 767px) {
  .search-bar {
    background: rgb(48, 48, 48);
    position: absolute;
    left: 50%; /* Set left to 50% of the viewport width */
    transform: translateX(-50%);
    top: 120%;
    width: 80vw;
  }
}
</style>