<template>
  <button :style="buttonStyles" @click="$emit('click')">
    <slot></slot> <!-- Allows for flexible content -->
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  color: String,
  onClick: Function,
});
const emit = defineEmits(['click']);

const buttonStyles = computed(() => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  borderRadius: '15px',
  padding: '20px 30px',
  background: props.color || '#FFF', // Default to white if no color is provided
  fontFamily: "Gilroy",
  fontSize: '1.25rem',
  fontWeight: '500',
}));
</script>

<style scoped>
button {
  border: none;
  cursor: pointer;
}
button:hover, button:active {
  opacity: 0.75;
}
</style>
