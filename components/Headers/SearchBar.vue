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

// Watch for changes in searchResults to adjust the search bar border radius
watch(searchResults, () => {
  const searchBar = document.querySelector(".search-bar") as HTMLElement;
  if (searchResults.value) {
    searchBar?.style.setProperty("border-radius", "15px 15px 0 0");
  } else {
    searchBar?.style.setProperty("border-radius", "15px");
  }
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
  padding: 15px 30px;
  align-items: center;
  gap: 10px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.25);
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
  border-radius: 0 0 15px 15px;
  overflow: hidden;
  z-index: 10;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  border-right: 1px solid rgba(255, 255, 255, 0.25);
  border-left: 1px solid rgba(255, 255, 255, 0.25);
}

.loading,
.result,
.not-found {
  padding: 15px 30px;
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