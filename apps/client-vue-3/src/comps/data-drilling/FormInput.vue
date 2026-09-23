<script setup lang="ts">
type Props = {
  id: string;
  label: string;
  // modelValue: string;
};

// const { id, label, modelValue } = defineProps<Props>();
const { id, label } = defineProps<Props>();
const model = defineModel<string>();
</script>

<template>
  <div class="mb-3">
    <label :for="id" class="form-label">{{ label }}</label>
    <!-- <input
      class="form-control"
      autocomplete="false"
      v-bind:id="id"
      v-bind:value="modelValue"
      v-on:input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      v-bind="$attrs"
    /> -->

    <input
      class="form-control"
      autocomplete="false"
      v-bind:id="id"
      v-model="model"
      v-bind="$attrs"
    />
  </div>
</template>
