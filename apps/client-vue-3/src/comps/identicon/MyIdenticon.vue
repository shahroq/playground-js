<script setup lang="ts">
import { computed, ref } from "vue";
import { toSvg } from "jdenticon";

const input = ref<string>("");

const identicon = computed(() => {
  if (!input.value) return false;

  return toSvg(input.value, 200);
});
</script>

<template>
  <div>
    <h4>Identicon Generator 01</h4>
    <form @submit.prevent="">
      <div class="mb-3">
        <label for="input" class="form-label">Input</label>

        <input id="input" name="input" type="text" class="form-control" v-model="input" />
      </div>

      <div class="mb-3">
        <label for="output" class="form-label">Output</label>
        <br />
        <span id="output" name="output" v-html="identicon" />
      </div>
    </form>
  </div>
</template>
