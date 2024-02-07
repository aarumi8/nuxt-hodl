<template>
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
</template>

<script setup lang="ts">
const route = useRoute();

function isRouteActive(path: string): boolean {
  return route.path === path;
}
</script>


<style scoped>
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
  background: rgba(255, 255, 255, 0);
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
  .header-text-desktop {
    display: none;
  }
  .mobile-links-menu {
    display: flex;
  }
}
</style>