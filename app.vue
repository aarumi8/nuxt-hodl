<template>
  <div>
    <HeadersHeader />
    <div class="layout">
      <NuxtPage />
    </div>
  </div>
</template>

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
