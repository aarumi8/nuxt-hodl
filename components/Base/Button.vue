<template>
  <button :style="buttonStyles" @click="$emit('click')">
    <slot></slot> <!-- Allows for flexible content -->
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  color: String,
  textColor: String,
  border: String,
  onClick: Function,
});
const emit = defineEmits(['click']);

const buttonStyles = computed(() => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  borderRadius: '2px',
  padding: '20px 30px',
  background: props.color || '#FFF', // Default to white if no color is provided
  fontFamily: "Gilroy",
  fontSize: '1.25rem',
  fontWeight: '500',
  color: props.textColor || '#000', // Default to black if no color is provided
  border: props.border || 'border: 0px'
}));
</script>

<style scoped>
button {
  border: none;
  cursor: pointer;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.40) inset, 0px 5px 4px 0px rgba(0, 0, 0, 0.80);
  transition: transform 300ms;
}
button:hover, button:active {
  transform: scale(1.05);
}
</style>
