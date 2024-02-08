<template>
  <Button :color="buttonColor" :textColor="textColor" @click="handleClick">
    {{ buttonText }}
  </Button>
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
