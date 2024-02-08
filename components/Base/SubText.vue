<template>
  <div>
    <div class='sub-text'>{{ subText }}</div>
    <div class='sub-text-active'>{{ " " + subTextActive }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  subText: String,
  subTextActive: String,
});
</script>

<style scoped>
.sub-text, .sub-text-active {
  display: inline; /* Make both divs display inline */
  font-family: Gilroy;
  font-style: normal;
  line-height: normal;
}

.sub-text {
  color: rgb(140, 140, 140);
  font-size: 1.5rem;
  font-weight: 500;
}

.sub-text-active {
  color: #fff;
  font-size: 1.5rem;
  font-weight: 500;
}
</style>
