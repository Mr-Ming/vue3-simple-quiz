import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useQuizStore = defineStore('quiz', () => {
  const questions = ref<object[]>([]);

  const setQuestions = (newQuestions: object[]) => {
    questions.value = newQuestions;

    console.log(newQuestions)
  }

  return { questions, setQuestions }
})
