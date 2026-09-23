<script setup lang="ts">
type Props = {
  id: string;
  label: string;
};

const { id, label } = defineProps<Props>();
const model = defineModel<string>();
</script>

<template>
  <div class="mb-3">
    <label :for="id" class="form-label">{{ label }}</label>

    <textarea
      class="form-control"
      autocomplete="false"
      v-bind:id="id"
      v-model="model"
      v-bind="$attrs"
    />
  </div>
</template>
