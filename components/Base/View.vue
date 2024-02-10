<template>
    <div class="wrapper-view">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.wrapper-view {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 20px;
    background-color: rgb(32,32,32);
    border-radius: 15px;
    border: 1px solid rgb(71, 71, 71);
}
</style>