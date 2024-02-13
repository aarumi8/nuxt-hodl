<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const isVisible = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal: Boolean) => {
    isVisible.value = newVal;
  }
);

function closeModal() {
  emit("update:modelValue", false);
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(25, 25, 25, 0.4);
  backdrop-filter: blur(13.395833015441895px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  border-radius: 13.396px;
  border: 0.893px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.05);
  width: 50%;
  backdrop-filter: blur(26.79166603088379px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
