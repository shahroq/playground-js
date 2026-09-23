<script setup lang="ts">
import { ref } from "vue";

const newTask = ref<string>("");

const emit = defineEmits<{
  add: [title: string];
}>();

function addTask(): void {
  const title = newTask.value.trim();

  if (!title) return;

  emit("add", title);

  newTask.value = "";
}
</script>

<template>
  <form @submit.prevent="addTask">
    <div class="mb-3">
      <label for="task" class="form-label">New Task</label>

      <input id="task" v-model.trim="newTask" name="task" type="text" class="form-control" />
    </div>

    <button type="submit" class="btn btn-primary">Add Task</button>
  </form>
</template>
