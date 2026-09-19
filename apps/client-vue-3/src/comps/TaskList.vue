<script setup lang="ts">
import { onMounted, reactive } from "vue";
import TaskForm from "./TaskForm.vue";
import TaskItem from "./TaskItem.vue";
import type { Task } from "@/types";

const state = reactive<{
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}>({
  tasks: [{ id: 1, title: "task 1" }],
  isLoading: false,
  error: null,
});

function addTask(title: string): void {
  state.tasks.push({ id: Date.now(), title });
}

function deleteTask(id: number): void {
  state.tasks = state.tasks.filter((task) => task.id !== id);
}

onMounted(async () => {
  state.isLoading = true;
  state.error = null;

  try {
    const response = await fetch("/api/todos?_limit=5");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data: Task[] = await response.json();

    state.tasks.push(...data);
  } catch (error) {
    state.error = error instanceof Error ? error.message : "Failed to fetch tasks";
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <div>
    <div class="text-center" v-if="state.isLoading">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-if="state.error" class="alert alert-warning" role="alert">Error: {{ state.error }}</div>

    <ul v-if="!state.isLoading" class="list-group">
      <TaskItem v-for="task in state.tasks" :key="task.id" :task="task" @delete="deleteTask" />
    </ul>

    <br />

    <TaskForm @add="addTask" />
  </div>
</template>
