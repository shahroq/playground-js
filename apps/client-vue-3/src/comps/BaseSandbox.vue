<script setup lang="ts">
import { ref } from "vue";

type Item = {
  id: number | string;
  label: string;
  purchased?: boolean;
};

// type Props = {};
// const {} = defineProps<Props>();

const newItem = ref<string>("");
const items = ref<Item[]>([
  { id: 1, label: "Mobile" },
  { id: 2, label: "Laptop" },
  { id: 3, label: "Tablet", purchased: true },
]);

const saveItem = () => {
  items.value.push({ id: crypto.randomUUID(), label: newItem.value });
  newItem.value = "";
};

const toggleItem = (item: Item) => {
  item.purchased = !item.purchased;
};
</script>

<template>
  <div class="mb-3">
    <label for="item" class="form-label">New Item</label>

    <input id="task" v-model.trim="newItem" name="item" type="text" class="form-control" />
  </div>
  <div class="mb-3">
    <button class="btn btn-primary" v-on:click="saveItem" v-bind:disabled="newItem.length < 2">
      Add
    </button>
  </div>
  <hr />
  <ul>
    <li
      v-for="item in items"
      v-bind:key="item.id"
      :class="{ purchased: item.purchased }"
      v-on:click="toggleItem(item)"
    >
      {{ item.label }}
    </li>
  </ul>
  <p v-if="!items.length">No Items</p>
</template>

<style scoped>
.purchased {
  text-decoration: line-through;
}
</style>
