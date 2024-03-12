<template>
    <div class="wrapper-view">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.wrapper-view {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: rgb(32,32,32);
    border-radius: 2px;
    border: 1px solid rgba(255, 255, 255, 0.30);
    box-shadow: 0px 9px 19px 0px rgba(0, 0, 0, 0.20), 0px 35px 35px 0px rgba(0, 0, 0, 0.17), 0px 79px 47px 0px rgba(0, 0, 0, 0.10), 0px 141px 56px 0px rgba(0, 0, 0, 0.03), 0px 220px 62px 0px rgba(0, 0, 0, 0.00);
}
</style>