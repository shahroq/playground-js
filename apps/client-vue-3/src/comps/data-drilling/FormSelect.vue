<script setup lang="ts">
export type Option = {
  value: string;
  label: string;
};

type Props = {
  id: string;
  label: string;
  options: Option[];
};

const { id, label, options } = defineProps<Props>();
const model = defineModel<string | null>();
</script>

<template>
  <div class="mb-3">
    <label :for="id" class="form-label">{{ label }}</label>

    <select
      class="form-control"
      autocomplete="false"
      v-bind:id="id"
      v-model="model"
      v-bind="$attrs"
    >
      <option selected>Open this select menu</option>
      <option v-for="option in options" v-bind:key="option.value" v-bind:value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
