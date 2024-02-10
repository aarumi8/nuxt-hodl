<template>
  <BaseView style="width: 100%">
    <ViewsTokenInfoUp :vault="props.vault" />
    <ViewsTokenInfoDown :vault="props.vault" />
  </BaseView>
</template>

<script setup lang="ts">
const props = defineProps({
  vault: Object,
});
</script>
