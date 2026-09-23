<script setup lang="ts">
import { onMounted, reactive } from "vue";
import TaskForm from "./TaskForm.vue";
import TaskItem from "./TaskItem.vue";
import type { Task } from "@/types";

const store = reactive<{
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}>({
  tasks: [{ id: 1, title: "task 1" }],
  isLoading: false,
  error: null,
});

function addTask(title: string): void {
  store.tasks.push({ id: Date.now(), title });
}

function deleteTask(id: number): void {
  store.tasks = store.tasks.filter((task) => task.id !== id);
}

onMounted(async () => {
  store.isLoading = true;
  store.error = null;

  try {
    const response = await fetch("/api/todos?_limit=5");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data: Task[] = await response.json();

    store.tasks.push(...data);
  } catch (error) {
    store.error = error instanceof Error ? error.message : "Failed to fetch tasks";
  } finally {
    store.isLoading = false;
  }
});
</script>

<template>
  <div>
    <div class="text-center" v-if="store.isLoading">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-if="store.error" class="alert alert-warning" role="alert">Error: {{ store.error }}</div>

    <ul v-if="!store.isLoading" class="list-group">
      <TaskItem v-for="task in store.tasks" :key="task.id" :task="task" @delete="deleteTask" />
    </ul>

    <br />

    <TaskForm @add="addTask" />
  </div>
</template>
