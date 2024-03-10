<template>
  <nuxt-link to="/" class="logo"></nuxt-link>
</template>

<script setup lang="ts">
</script>


<style scoped>
.logo {
  display: flex;
  background-image: url("~/assets/logo.svg");
  text-decoration: none;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  min-width: 78px;
  min-height: 78px;
}
@media (max-width: 767px) {
  .logo {
    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>