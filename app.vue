<template>
  <div>
        <div class="bkg" />
    <HeadersHeader />
    <div class="layout">
      <NuxtPage />
    </div>
    <div class="bg" />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'HODL',
  meta : [
    { name: 'HODL', content: 'APP of HODL Industries'}
  ]
})
</script>

<style scoped>
.layout {
  margin-top: 40px;
}
@media (max-width: 767px) {
  .layout {
    margin: 3.9vh 4vw 30% 4vw;
  }
}

</style>
