<template>
  <header class="header">
    <nuxt-link to="/" class="logo">HODL</nuxt-link>
    <nuxt-link to="/" :class="['header-text', { 'active': isRouteActive('/') }]">Explore</nuxt-link>
    <nuxt-link to="/portfolio" :class="['header-text', { 'active': isRouteActive('/portfolio') }]">Portfolio</nuxt-link>
    <div class="search-bar">
      <span class="search-icon"></span>
      <input type="text" placeholder="Search by token" />
    </div>
    <button class="connect-wallet">Connect Wallet</button>
  </header>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const route = useRoute();

    function isRouteActive(path: string): boolean {
      return route.path === path;
    }

    return { isRouteActive };
  }
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2vw;
  width: 100%;
}

.logo {
  color: #FFF;
  font-family: 'Gilroy', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  text-decoration: none;
}

.header-text {
  color: #FFF;
  font-family: 'Gilroy', sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  text-decoration: none;
  opacity: 0.5;
}

.header-text.active {
  opacity: 1.0;
}

.header-text:hover, .header-text:active {
  opacity: 1.0;
}

.search-bar {
  display: flex;
  width: 100%;
  padding: 1.85vh 1.08vw;
  align-items: center;
  gap: 10px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.10);
}

.search-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  background-image: url('~/assets/searchIcon.svg');
}

.search-bar input {
  background: transparent;
  border: none;
  color: #FFF;
  font-family: 'Gilroy', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  width: 100%;
}

input:focus {
    outline:none;
}

.connect-wallet {
  display: flex;
  white-space: nowrap;
  padding: 1.85vh 2.08vw;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.10);
  color: #FFF;
  font-family: 'Gilroy';
  font-size: 1.25rem;
  font-weight: 500;
}

.connect-wallet:hover, .connect-wallet:active {
  opacity: 0.75;
}
</style>
