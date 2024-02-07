<template>
    <div class="wrapper">
      <HeadingText :text="headingText" />
      <SubText :sub-text="subText" :sub-text-active="subTextActive" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
  headingText: String,  
  subText: String,
  subTextActive: String,
});
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
