<template>
  <BaseView>
    <ViewsTokenInfoUp :vault="props.vault" />
    <ViewsTokenInfoDown :vault="props.vault" />
  </BaseView>
</template>

<script setup lang="ts">
const props = defineProps({
  vault: Object,
});
</script>

<style scoped>
</style>