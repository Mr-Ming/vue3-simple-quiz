<template>
  <div>
    <b
      >Please read through the following instructions before clicking on "Start
      Quiz"</b
    ><br /><br />
    1) You cannot move to the next quiz question without selecting an answer to
    the current. <br />
    2) You are free to go back to the previous question and re-select a
    different answer. <br />
    3) Each question in the quiz will be individually timed. <br />
    4)
    <b
      >The timer for a specific question will not reset if you decide to change
      your answer later. </b
    ><br />
    5) There will be a review page after you answer all questions. <br />
  </div>
  <v-btn
    class="mt-4"
    color="success"
    variant="elevated"
    @click="handleStartQuiz"
    width="50%"
    >Start Quiz</v-btn
  >
</template>

<script setup lang="ts">
import { QUIZ_STAGE_EXAMINATION } from "@/libs/constants";
import { useQuizStore } from "@/stores/quiz";

/**
 * Handle the case where user click on start quiz button.
 */
const handleStartQuiz = () => {
  useQuizStore().setCurrentStage(QUIZ_STAGE_EXAMINATION);
};
</script>
