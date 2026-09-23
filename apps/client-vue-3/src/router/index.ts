import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import { h } from "vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/comp",
      name: "comp",
      component: () => import("@/views/CompView.vue"),
    },
    // add 404
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      // component: () => import("@/views/NotFoundView.vue"),
      component: h("h1", "404 Not Found"),
    },
  ],
});

export default router;
