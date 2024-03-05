<template>
  <div ref="animationContainer" class="animationContainer"></div>
</template>

<script setup>
import animationData from '../../assets/loading.json';
import lottie from 'lottie-web';

const animationContainer = ref(null);
let animationInstance = null;

onMounted(() => {
  animationInstance = lottie.loadAnimation({
    container: animationContainer.value, // the dom element
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: animationData,
  });
});

onUnmounted(() => {
  animationInstance.destroy();
});
</script>

<style scoped>
.animationContainer {
    display: flex;
    width: 50%;
}
</style>
