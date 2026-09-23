<script setup lang="ts">
import { computed } from "vue";

export type Variant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

type Props = {
  variant: Variant;
  dismissible?: boolean;
};

const { variant = "primary", dismissible = true } = defineProps<Props>();
// const alertType = computed(() => `alert-${variant}`);
// for tw
const alertType = computed(() => {
  return {
    primary: "alert-primary",
    secondary: "alert-secondary",
    success: "alert-success",
    danger: "alert-danger",
    warning: "alert-warning",
    info: "alert-info",
    light: "alert-light",
    dark: "alert-dark",
  }[variant];
});

const emit = defineEmits(["close"]);
</script>

<template>
  <div :class="['alert', alertType, dismissible ? 'alert-dismissible' : '']" role="alert">
    <div>
      <slot />
    </div>
    <button
      v-if="dismissible"
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
      @click="emit('close')"
    ></button>
  </div>
</template>
