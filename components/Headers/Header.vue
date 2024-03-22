<template>
  <header class="header">
    <HeadersLogoLink />
    <HeadersNavigation />
    <HeadersSearchBar v-if="showMobileSearchBar" />

    <div class="searchAndButton">
      <!-- Mobile Search Icon -->
      <span
        class="mobile-search-icon"
        :class="{ active: showMobileSearchBar }"
        @click="toggleMobileSearch"
      ></span>

      <HeadersConnectWallet />
    </div>
  </header>
</template>

<script setup lang="ts">
// Reactive state for showing the mobile search bar
const showMobileSearchBar = ref(true);

// Function to toggle the visibility of the mobile search bar
const toggleMobileSearch = () => {
  showMobileSearchBar.value = !showMobileSearchBar.value;
};

// Function to update visibility based on window width
const updateWidth = () => {
  if (window.innerWidth > 767) {
    showMobileSearchBar.value = true;
  } else {
    showMobileSearchBar.value = false;
  }
};

// Lifecycle hooks for mounted and unmounted
onMounted(() => {
  updateWidth(); // Initial check
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});
</script>


<style scoped>
.header {
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  width: 100%;
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

.searchAndButton {
  display: flex;
  align-items: center;
  gap: 20px;
}

@media (max-width: 1000px) {
  .header {
    gap: 15px;
  }
}

@media(hover:hover) {
    .mobile-search-icon:hover {
    opacity: 0.75;
  }
}

@media (max-width: 767px) {
  .header {
    background-color: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .mobile-search-icon {
    display: flex; /* Show search icon on mobile */
  }

  .mobile-search-icon:active {
    opacity: 0.75;
  }
}
</style>
