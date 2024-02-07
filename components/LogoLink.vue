<template>
    <nuxt-link to="/" class="logo">HODL</nuxt-link>
</template>

<script lang="ts">
export default defineComponent({
    setup() {
        
    },
})
</script>


<style scoped>
.logo {
  color: #fff;
  font-family: "Gilroy", sans-serif;
  font-size: 2rem;
  font-weight: 700;
  text-decoration: none;
}
@media (max-width: 767px) {
  .logo {
    margin-left: 4vw;
    margin-top: 4vw;
    margin-bottom: 4vw;
  }
}
</style>