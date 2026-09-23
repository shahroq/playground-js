<script setup lang="ts">
import { onMounted, reactive } from "vue";

type Props = {
  username: string;
};

type User = {
  login: string;
  html_url: string;
  avatar_url: string;
  followers: number;
  following: number;
};

type Store = {
  data: User | null;
  isLoading: boolean;
  error: Error | null;
};

const { username } = defineProps<Props>();

const store = reactive<Store>({
  data: null,
  isLoading: false,
  error: null,
});

async function fetchUser(username: string): Promise<User> {
  const response = await fetch(`https://api.github.com/users/${username}`);

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return (await response.json()) as User;
}

async function loadUser() {
  store.isLoading = true;
  store.error = null;

  try {
    store.data = await fetchUser(username);
  } catch (error) {
    store.error = error instanceof Error ? error : new Error("Unknown error");
  } finally {
    store.isLoading = false;
  }
}

onMounted(loadUser);
</script>

<template>
  <div class="card" style="width: 18rem">
    <!-- Loading -->
    <div v-if="store.isLoading" class="card-body text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="store.error" class="card-body">
      <div class="alert alert-danger mb-0">
        {{ store.error.message }}
      </div>
    </div>

    <!-- Data -->
    <template v-else-if="store.data">
      <img
        :src="store.data.avatar_url"
        class="card-img-top"
        :alt="`${store.data.login}'s avatar`"
      />

      <div class="card-body">
        <h5 class="card-title">
          {{ store.data.login }}
        </h5>

        <p class="card-text">
          Followers: {{ store.data.followers }}
          <br />
          Following: {{ store.data.following }}
        </p>

        <a
          :href="store.data.html_url"
          class="btn btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Page
        </a>
      </div>
    </template>
  </div>
</template>
