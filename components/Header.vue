<template>
  <header class="header">
    <nuxt-link to="/" class="logo">HODL</nuxt-link>

    <nuxt-link
      to="/"
      :class="['header-text-desktop', { active: isRouteActive('/') }]"
      >Explore</nuxt-link
    >
    <nuxt-link
      to="/portfolio"
      :class="['header-text-desktop', { active: isRouteActive('/portfolio') }]"
      >Portfolio</nuxt-link
    >

    <div class="mobile-links-menu">
          <nuxt-link
      to="/"
      :class="['header-text-mobile', { active: isRouteActive('/') }]"
      >Explore</nuxt-link
    >
    <nuxt-link
      to="/portfolio"
      :class="['header-text-mobile', { active: isRouteActive('/portfolio') }]"
      >Portfolio</nuxt-link
    >
    </div>

    <div class="search-bar" v-if="showMobileSearchBar">
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

    <div class="searchAndButton">
      <!-- Mobile Search Icon -->
      <span
        class="mobile-search-icon"
        :class="{ active: showMobileSearchBar }"
        @click="toggleMobileSearch"
      ></span>

      <button class="connect-wallet">Connect Wallet</button>
      <button class="connect-wallet-mobile">Connect</button>
    </div>
  </header>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const route = useRoute();
    const searchQuery = ref("");
    const searchResults = ref(null);
    const searching = ref(false);
    const showMobileSearchBar = ref(true);

    onMounted(() => {
      // if user clicks outside of the search results, close the dropdown
      window.addEventListener("click", (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest(".search-bar")) return;
        searchResults.value = null;
      });

      updateWidth();

      window.addEventListener("resize", updateWidth);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", updateWidth);
    });

    // if results view is open, make search bar border radius to 0px
    watch(searchResults, () => {
      const searchBar = document.querySelector(".search-bar") as HTMLElement;
      if (searchResults.value) {
        searchBar?.style.setProperty("border-radius", "15px 15px 0 0");
      } else {
        searchBar?.style.setProperty("border-radius", "15px");
      }
    });

    // Method to toggle the visibility of the search bar
    const toggleMobileSearch = () => {
      showMobileSearchBar.value = !showMobileSearchBar.value;
    };

    // add lodash debounce in future
    const handleSearch = () => {
      if (!searchQuery.value) {
        searchResults.value = null;
        return;
      }
      searching.value = true;
      // Simulate an API call to search for the token
      const results = "kek"; // Implement this function based on your API
      searchResults.value = results;
      searching.value = false;
    }; // Adjust debounce timing as needed

    function isRouteActive(path: string): boolean {
      return route.path === path;
    }

    function updateWidth() {
      if(window.innerWidth > 767) {
        showMobileSearchBar.value = true;
      } else {
        showMobileSearchBar.value = false;
      }
    }

    return {
      isRouteActive,
      searchQuery,
      searchResults,
      searching,
      handleSearch,
      showMobileSearchBar,
      toggleMobileSearch,
    };
  },
});
</script>

<style scoped>
.header {
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  gap: 2vw;
  width: 100%;
}

.logo {
  color: #fff;
  font-family: "Gilroy", sans-serif;
  font-size: 2rem;
  font-weight: 700;
  text-decoration: none;
}

.header-text-desktop {
  color: #fff;
  font-family: "Gilroy", sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  text-decoration: none;
  opacity: 0.5;
}

.header-text-desktop.active {
  opacity: 1;
}

.header-text-desktop:hover,
.header-text-desktop:active {
  opacity: 1;
}

.search-bar {
  display: flex;
  position: relative;
  width: 100%;
  padding: 1.85vh 1.08vw;
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

.mobile-search-icon {
  display: none;
  width: 1rem;
  height: 1rem;
  background-image: url("~/assets/searchIcon.svg");
  transform: scale(1.25);
}

.mobile-search-icon.active {
  background-image: url("~/assets/activeSearchIcon.svg"); /* Icon when active/search bar is shown */
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

.connect-wallet {
  display: flex;
  white-space: nowrap;
  padding: 1.85vh 2.08vw;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-family: "Gilroy";
  font-size: 1.25rem;
  font-weight: 500;
}

.connect-wallet:hover,
.connect-wallet:active {
  opacity: 0.75;
}

.connect-wallet-mobile {
  display: none;
  white-space: nowrap;
  padding: 1.85vh 2.08vw;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-family: "Gilroy";
  font-size: 1.25rem;
  font-weight: 500;
}

.connect-wallet-mobile:hover,
.connect-wallet-mobile:active {
  opacity: 0.75;
}

.search-results {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  left: 0;
  top: 103%;
  background: rgb(48, 48, 48);
  border-radius: 0 0 15px 15px;
  overflow: hidden;
  z-index: 10;
}

.loading,
.result,
.not-found {
  padding: 1.85vh 1.08vw;
  color: #fff;
  font-family: "Gilroy", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  z-index: 10;
}

.result a {
  color: #007bff; /* Adjust color as needed */
}

.searchAndButton {
  display: flex;
  align-items: center;
  gap: 3vw;
}

.mobile-links-menu {
  bottom: 5%;
  display: none;
  flex-direction: row;
  position: fixed;
  background-color: rgb(75, 75, 75);
  width: 90%;
  padding: 1vh 2.08vw;
  border-radius: 5px;
   left: 50%; /* Set left to 50% of the viewport width */
  transform: translateX(-50%);
}

.header-text-mobile {
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.0);
  color: #fff;
  font-family: "Gilroy";
  font-size: 1rem;
  font-weight: 500;
  padding: 2vh 2.08vw;
  white-space: nowrap;
  width: 100%;
  text-align: center;
  text-decoration: none;
}

.header-text-mobile.active {
  background: rgba(255, 255, 255, 0.2);
}

@media (max-width: 767px) {
  .header {
    background-color: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .logo {
    margin-left: 4vw;
    margin-top: 4vw;
    margin-bottom: 4vw;
  }

  .search-bar {
    background: rgb(48, 48, 48);
    position: absolute;
    top: 120%;
    width: 90vw;
    margin-right: 4vw;
    margin-left: 4vw;
  }

  .header-text-desktop {
    display: none;
  }

  .mobile-search-icon {
    display: flex; /* Show search icon on mobile */
  }

  .mobile-search-icon:hover,
  .mobile-search-icon:active {
    opacity: 0.75;
  }

  .connect-wallet-mobile {
    margin-right: 4vw;
    margin-top: 4vw;
    margin-bottom: 4vw;
    display: flex; /* Show connect wallet button on mobile */
  }

  .connect-wallet {
    display: none; /* Hide connect wallet button on mobile */
  }

  .mobile-links-menu {
    display: flex;
  }
}
</style>
