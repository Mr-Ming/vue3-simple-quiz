<template>
  <main>
    <h1 class="heading">{{ stageHeading }}</h1>
    <QuizSelectionForm v-if="currentStage === QUIZ_STAGE_SELECTION" />
    <QuizInstruction v-if="currentStage === QUIZ_STAGE_INSTRUCTION" />
    <QuizExaminationForm v-if="currentStage === QUIZ_STAGE_EXAMINATION" />
    <QuizReviewForm v-if="currentStage === QUIZ_STAGE_REVIEW" />
    <QuizResultForm v-if="currentStage === QUIZ_STAGE_RESULT" />
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import QuizExaminationForm from "@/components/QuizExaminationForm.vue";
import QuizInstruction from "@/components/QuizInstruction.vue";
import QuizResultForm from "@/components/QuizResultForm.vue";
import QuizReviewForm from "@/components/QuizReviewForm.vue";
import QuizSelectionForm from "@/components/QuizSelectionForm.vue";
import {
  QUIZ_STAGE_EXAMINATION,
  QUIZ_STAGE_INSTRUCTION,
  QUIZ_STAGE_SELECTION,
  QUIZ_STAGE_REVIEW,
  QUIZ_STAGE_RESULT,
} from "@/libs/constants";
import { getStageHeading } from "@/libs/utils";
import { useQuizStore } from "@/stores/quiz";

const currentStage = ref<string>(useQuizStore().currentStage);
const stageHeading = ref<string>(getStageHeading(QUIZ_STAGE_SELECTION));

watch(
  () => useQuizStore().currentStage,
  (newStage) => {
    currentStage.value = newStage;
    stageHeading.value = getStageHeading(newStage);
  },
);
</script>

<style scoped>
.heading {
  border-bottom: 1px lightgreen solid;
  margin-bottom: 2rem;
  width: 50%;
}
</style>
