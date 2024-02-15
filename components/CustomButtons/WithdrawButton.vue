<template>
  <BaseButton :color="buttonColor" :textColor="textColor" :border="border" @click="$emit('click')">
    {{ buttonText }}
  </BaseButton>
</template>

<script setup lang="ts">
const props = defineProps({
  buttonColor: String,
  buttonText: String,
  textColor: String,
  border: String
});

const emit = defineEmits(['click']);

function handleClick() {
  console.log('learn more btn')
  // Additional logic for the ConnectButton click event
}
</script>
