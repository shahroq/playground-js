<script setup lang="ts">
import type { Task } from "@/types";
import { computed } from "vue";

const props = defineProps<{ task: Task }>();

const emit = defineEmits<{
  delete: [id: number];
}>();

const titleTruncated = computed(() => {
  const maxLength = 20;

  return props.task.title.length > maxLength
    ? `${props.task.title.slice(0, maxLength)}...`
    : props.task.title;
});
</script>

<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>
      {{ titleTruncated }}
    </span>

    <button type="button" class="btn btn-danger btn-sm" @click="emit('delete', task.id)">X</button>
  </li>
</template>
