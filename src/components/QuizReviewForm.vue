<template>
  <div class="mb-3">Here are all your selection.</div>

  <QuizReviewQuestions :stage="QUIZ_STAGE_REVIEW" />

  <v-btn
    class="mt-4"
    color="success"
    variant="elevated"
    @click="handleSubmitAnswer"
    width="50%"
    >Submit Answer</v-btn
  >
</template>

<script setup lang="ts">
import QuizReviewQuestions from "@/components/QuizReviewQuestions.vue";
import { QUIZ_STAGE_REVIEW, QUIZ_STAGE_RESULT } from "@/libs/constants";
import { useQuizStore } from "@/stores/quiz";

/**
 * Handle the case where user click on submit answer button.
 */
const handleSubmitAnswer = () => {
  useQuizStore().setCurrentStage(QUIZ_STAGE_RESULT);
};
</script>

<style scoped>
.review-question {
  width: 50%;
}
</style>
