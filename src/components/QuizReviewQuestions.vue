<template>
  <div
    class="mt-5 review-question"
    :key="index"
    v-for="(item, index) in questionWithUserAnswer"
  >
    <div :class="item.fieldType">
      <div>
        <v-icon
          v-if="stage === QUIZ_STAGE_RESULT"
          :icon="item.isUserCorrect ? 'mdi-check-circle' : 'mdi-close-circle'"
        />
        {{ index + 1 }}. {{ item.questions }}
      </div>

      <div v-if="stage === QUIZ_STAGE_RESULT">
        Correct Answer: {{ item.correctAnswer }}
      </div>

      <div>Your Answer: {{ item.userAnswer }}</div>

      <div>Time Taken: {{ formatTime(item.userTimer) }}</div>

      <v-btn
        v-if="stage === QUIZ_STAGE_REVIEW"
        class="mb-6"
        color="secondary"
        variant="tonal"
        @click="handleChangeAnswer(index)"
        >Change Answer</v-btn
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  QUIZ_STAGE_EXAMINATION,
  QUIZ_STAGE_RESULT,
  QUIZ_STAGE_REVIEW,
} from "@/libs/constants";
import { formatTime } from "@/libs/utils";
import { useQuizStore } from "@/stores/quiz";

defineProps({
  stage: String,
});

const questionWithUserAnswer = ref<object[]>([]);

/**
 * Handle the case where user click on change answer button.
 */
const handleChangeAnswer = (index: number) => {
  useQuizStore().setRevisitedQuestion(index);
  useQuizStore().setCurrentStage(QUIZ_STAGE_EXAMINATION);
};

onMounted(() => {
  // When this component mounts, we will load the review page with the proper data.
  questionWithUserAnswer.value = useQuizStore().getQuestionsWithUserAnswer();
});
</script>

<style scoped>
.field-correct {
  color: lightgreen;
}

.field-incorrect {
  color: lightcoral;
}

.review-question {
  width: 50%;
}
</style>
