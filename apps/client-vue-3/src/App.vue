<script setup lang="ts">
import { ref } from "vue";

const user = ref<string>("John Doe");
</script>

<template>
  <div class="container my-5">
    <h2 class="mb-4">Hello {{ user }}</h2>
    <RouterView />
  </div>
</template>

<style scoped></style>
