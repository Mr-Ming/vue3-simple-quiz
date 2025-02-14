import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/quiz/MainPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'quiz',
      component: MainPage,
    },
  ],
})

export default router
