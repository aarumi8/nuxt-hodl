<template>
    <div class="loading-container">
        <BaseLoading />
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.loading-container {
    display: flex;
    align-content: center;
    justify-content: center;
    width: 100%;
      position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
</style>