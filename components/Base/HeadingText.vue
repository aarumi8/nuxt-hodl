<template>
  <div class='heading-text'>{{ text }}</div>
</template>

<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<style scoped>
.heading-text {
  color: #fff;
  font-size: 2rem;
  font-family: Gilroy;
  font-weight: 500;
  font-style: normal;
  line-height: normal;
}
</style>
