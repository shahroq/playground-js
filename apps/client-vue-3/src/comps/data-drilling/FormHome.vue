<script setup lang="ts">
import { reactive } from "vue";
import FormInput from "./FormInput.vue";
import FormTextarea from "./FormTextarea.vue";
import FormSelect from "./FormSelect.vue";

type Store = {
  title: string;
  description: string;
  category: string | null;
};

const store = reactive<Store>({
  title: "t1",
  description: "d1",
  category: null,
});
</script>

<template>
  <div>
    <FormInput
      name="title"
      id="title"
      placeholder="Enter Title"
      type="text"
      label="Title"
      v-model="store.title"
    />

    <FormTextarea
      name="description"
      id="description"
      placeholder="Enter Description"
      label="Description"
      v-model="store.description"
    />

    <FormSelect
      name="category"
      id="category"
      label="category"
      v-model="store.category"
      v-bind:options="[
        { value: '1', label: 'One' },
        { value: '2', label: 'Two' },
        { value: '3', label: 'Three' },
      ]"
    />
  </div>
</template>
