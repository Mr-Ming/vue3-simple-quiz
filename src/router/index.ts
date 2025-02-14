import { createRouter, createWebHistory } from "vue-router";
import QuizPage from "@/views/quiz/QuizPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "quiz",
      component: QuizPage,
    },
  ],
});

export default router;
