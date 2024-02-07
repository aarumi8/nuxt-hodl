<template>
  <Button :color="buttonColor" @click="handleClick">
    {{ buttonText }}
  </Button>
</template>

<script setup lang="ts">
const props = defineProps({
  buttonColor: String,
  buttonText: String,
});

const emit = defineEmits(['click']);

function handleClick() {
  console.log('create vault btn')
  // Additional logic for the ConnectButton click event
}
</script>
