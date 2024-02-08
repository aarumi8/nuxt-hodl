<template>
  <BaseButton :color="buttonColor" :textColor="textColor" @click="handleClick">
    {{ buttonText }}
  </BaseButton>
</template>

<script setup lang="ts">
const props = defineProps({
  buttonColor: String,
  buttonText: String,
  textColor: String,
});

const emit = defineEmits(['click']);

function handleClick() {
  console.log('learn more btn')
  // Additional logic for the ConnectButton click event
}
</script>
