<template>
  <div class="w-search-bar">
    <span class="w-search-icon"></span>
    <input
      type="text"
      placeholder="Search by token"
      v-model="searchQuery"
      @input="handleSearch"
    />
    <div class="w-search-results" v-if="searchPerformed">
      <div v-if="searching" class="loading">Loading...</div>
      <div v-else-if="searchResults" class="result" style="display: flex; align-items: center" @click="handleResultClick(searchResults)">
        <img v-if="searchResults._rawValue.logo" :src="searchResults._rawValue.logo" class="vault-image">
        {{ searchResults._rawValue.name }}
      </div>
      <div v-else class="w-not-found">Not found</div>
    </div>
  </div>
</template>


<script setup lang="ts">
const searchQuery = ref("");
const searchResults = ref(null);
const searching = ref(false);
const searchPerformed = ref(false);
const config = useRuntimeConfig();
const token = ref(null)

const props = defineProps<{
  modelValue?: any;
}>();

const emit = defineEmits(["update:modelValue"]);

onMounted(() => {
  const onClickOutside = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).closest(".w-search-bar")) {
      searchResults.value = null;
      searchQuery.value = ""; // Reset search query
      searchPerformed.value = false; // Indicate that a search hasn't been performed
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
  const searchBar = document.querySelector(".w-search-bar") as HTMLElement;
  if (searchResults.value) {
    searchBar?.style.setProperty("border-radius", "3px 3px 0 0");
  } else {
    searchBar?.style.setProperty("border-radius", "3px");
  }
});

async function searchToken(address: string) {
  try {
    const { data, error, pending } = await useFetch(
      config.public.baseURL + "/token?address=" + address
    );
    // console.log(data.value.haveTotalSupply)
    if (!data.value.haveTotalSupply) {
      return null;
    }
    return data;
  } catch (err) {
    console.log(err);
  }
  return null;
}

// Handle search logic, potentially adding lodash debounce in the future
const handleSearch = async () => {
  if (!searchQuery.value) {
    searchResults.value = null;
    searchPerformed.value = false; // Reset when search query is cleared
    return;
  }
  searching.value = true;
  searchPerformed.value = true; // Indicate that a search has been performed
  const results = await searchToken(searchQuery.value);
  if (!results) {
    searching.value = false;
    return;
  }
  searchResults.value = results;
  searching.value = false;
};

const handleResultClick = (result: any) => {
  result = searchResults
    token.value = {
      value: result.value._value.name,
      label: result.value._value.name,
      image: result.value._value.logo,
      address: result.value._value.tokenAddress,
      price: result.value._value.price,
      mc: result.value._value.marketCap,
      isBurnable: result.value._value.isBurnable,
      isLegit: result.value._value.isLegit
  }
  emit('update:modelValue', token.value); // Emit the selected result
  searchResults.value = null; // Clear search results
  searchQuery.value = ""; // Clear search query
  searchPerformed.value = false; // Indicate that the search is no longer active
};

</script>


<style scoped>
.w-search-bar {
  display: flex;
  position: relative;
  width: 100%;
  padding: 20px 30px;
  align-items: center;
  gap: 10px;
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.1);
}

.w-search-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  background-image: url("~/assets/searchIcon.svg");
}
.w-search-bar input {
  background: transparent;
  border: none;
  color: #fff;
  font-family: "Gilroy", sans-serif;
  font-size: 1.25rem;
  font-weight: 500;
  width: 100%;
}

input:focus {
  outline: none;
}
.w-search-results {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  left: -1px;
  top: 103%;
  background: rgb(48, 48, 48);
  border-radius: 0 0 3px 3px;
  overflow: hidden;
  z-index: 10;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  border-right: 1px solid rgba(255, 255, 255, 0.25);
  border-left: 1px solid rgba(255, 255, 255, 0.25);
}

.loading,
.result,
.w-not-found {
  padding: 20px 30px;
  color: #fff;
  font-family: "Gilroy", sans-serif;
  font-size: 1.25rem;
  font-weight: 500;
  z-index: 10;
}

.result a {
  color: #007bff; /* Adjust color as needed */
}
@media (max-width: 767px) {
  .w-search-bar {
    background: rgb(48, 48, 48);
    position: absolute;
    left: 50%; /* Set left to 50% of the viewport width */
    transform: translateX(-50%);
    top: 120%;
    width: 80vw;
  }
}
</style>