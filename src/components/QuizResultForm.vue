<template>
  <div class="mb-3">Here are the result of the quiz.</div>

  <QuizProgressBar
    color="success"
    label="Correct"
    :targetNumber="quizResult.totalAnswerCorrect"
    :maxNumber="quizResult.totalQuestions"
  />

  <QuizProgressBar
    color="error"
    label="Incorrect"
    :targetNumber="quizResult.totalAnswerIncorrect"
    :maxNumber="quizResult.totalQuestions"
  />

  <div class="mb-5">
    Total Time Spent: {{ formatTime(quizResult.totalTimeSpent) }}
  </div>

  <QuizReviewQuestions class="mt-5" :stage="QUIZ_STAGE_RESULT" />

  <v-btn
    class="mt-4"
    color="success"
    variant="elevated"
    @click="handleTakeNewQuiz"
    width="50%"
    >Take New Quiz</v-btn
  >
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import QuizProgressBar from "@/components/QuizProgressBar.vue";
import QuizReviewQuestions from "@/components/QuizReviewQuestions.vue";
import { QUIZ_STAGE_RESULT, QUIZ_STAGE_SELECTION } from "@/libs/constants";
import { formatTime } from "@/libs/utils";
import { useQuizStore } from "@/stores/quiz";

const quizResult = ref<object>({});

/**
 * Handle the case where user click on take new quiz button.
 */
const handleTakeNewQuiz = () => {
  useQuizStore().setCurrentStage(QUIZ_STAGE_SELECTION);
};

onMounted(() => {
  // When this component mounts, we will get the quiz result data.
  quizResult.value = useQuizStore().getQuizResult();
});
</script>
