<script setup lang="ts">
import BaseAlert from "@/comps/BaseAlert.vue";

const handleAlertClose = () => {
  console.log("Alert closed");
};
</script>

<template>
  <h2>Component Page</h2>
  <BaseAlert variant="primary" dismissible @close="handleAlertClose"
    >This is a success alert—check it out!</BaseAlert
  >
  <BaseAlert variant="danger" dismissible @close="handleAlertClose"
    >This is a success alert—check it out!</BaseAlert
  >
</template>

<style scoped></style>
