<template>
  <v-snackbar v-model="showSnackbar" color="error" rounded="pill">
    {{ QUIZ_ERROR_INVALID_ANSWER }}
    <template v-slot:actions>
      <v-btn variant="text" @click="showSnackbar = false"> Close </v-btn>
    </template>
  </v-snackbar>

  <QuizProgressBar
    color="#12512a"
    label="Progress"
    :targetNumber="currentQuestionIndex + 1"
    :maxNumber="totalQuestions"
  />

  <div class="elapsed-time mb-5">Elapsed Time: {{ formattedTime }}</div>

  <h2 class="mb-3 question">{{ currentQuestion.question }}</h2>

  <v-radio-group v-model="currentUserAnswer">
    <v-radio
      v-for="(choice, index) in currentQuestion.choices"
      :key="index"
      :label="choice"
      :value="choice"
      true-icon="mdi-check-decagram-outline"
      color="success"
      false-icon="mdi-decagram-outline"
      @click="handleSelectChoice(index)"
    ></v-radio>
  </v-radio-group>
  <v-btn
    v-if="currentQuestionIndex > 0"
    class="mt-4 mr-4"
    color="success"
    variant="elevated"
    @click="handlePreviousQuestion"
    >Previous Question</v-btn
  >
  <v-btn
    v-if="currentQuestionIndex < totalQuestions - 1"
    class="mt-4 mr-4"
    color="success"
    variant="elevated"
    @click="handleNextQuestion"
    >Next Question</v-btn
  >
  <v-btn
    v-if="currentQuestionIndex === totalQuestions - 1 || forceEnableReviewMode"
    class="mt-4"
    color="success"
    variant="elevated"
    @click="handleReviewAnswer"
    >Review Answer</v-btn
  >
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import QuizProgressBar from "@/components/QuizProgressBar.vue";
import { QUIZ_ERROR_INVALID_ANSWER, QUIZ_STAGE_REVIEW } from "@/libs/constants";
import { formatTime } from "@/libs/utils";
import { useQuizStore } from "@/stores/quiz";

const currentQuestionIndex = ref<number>(0);
const currentQuestion = ref<object>({});
const currentUserAnswer = ref<string | number | null>(null);
const forceEnableReviewMode = ref<boolean>(false);
const showSnackbar = ref<boolean>(false);
const totalQuestions = ref<number>(0);

const elapsedTime = ref<number>(0);
const isTimerRunning = ref<boolean>(false);
const timerInstance = ref(null);

const formattedTime = computed(() => formatTime(elapsedTime.value));

/**
 * Handle the case where user click on previous button.
 */
const handlePreviousQuestion = () => {
  // Save current answer.
  useQuizStore().setUserAnswer(
    currentQuestionIndex.value,
    currentUserAnswer.value,
    elapsedTime.value,
  );

  // Load previous question.
  currentQuestionIndex.value -= 1;
  currentUserAnswer.value = useQuizStore().getUserAnswerByIndex(
    currentQuestionIndex.value,
  );
  resetTimer(useQuizStore().getUserTimeByIndex(currentQuestionIndex.value));
  startTimer();
};

/**
 * Handle the case where user click on next button.
 */
const handleNextQuestion = () => {
  // Check that the quiz has been answered.
  if (currentUserAnswer.value === null) {
    showSnackbar.value = true;
    return;
  }

  // Save current answer.
  useQuizStore().setUserAnswer(
    currentQuestionIndex.value,
    currentUserAnswer.value,
    elapsedTime.value,
  );

  // Load next question.
  currentQuestionIndex.value += 1;
  currentUserAnswer.value = useQuizStore().getUserAnswerByIndex(
    currentQuestionIndex.value,
  );
  resetTimer(useQuizStore().getUserTimeByIndex(currentQuestionIndex.value));
  startTimer();
};

/**
 * Handle the case where user click on review page button.
 */
const handleReviewAnswer = () => {
  // Check that the quiz has been answered.
  if (currentUserAnswer.value === null) {
    showSnackbar.value = true;
    return;
  }

  // Save current answer.
  useQuizStore().setUserAnswer(
    currentQuestionIndex.value,
    currentUserAnswer.value,
    elapsedTime.value,
  );

  // Load review page.
  useQuizStore().setCurrentStage(QUIZ_STAGE_REVIEW);
};

/**
 * Handle user's answer selection.
 * @param number index The choice they selected.
 */
const handleSelectChoice = (index: number) => {
  currentUserAnswer.value = currentQuestion.value.choices[index];
};

/**
 * Start the time tracking for the current question.
 */
const startTimer = () => {
  if (!isTimerRunning.value) {
    isTimerRunning.value = true;
    timerInstance.value = setInterval(() => {
      elapsedTime.value++;
    }, 1000);
  }
};

/**
 * Reset the time tracking for the current question.
 * @param number time Default time to start from.
 */
const resetTimer = (time: number) => {
  clearInterval(timerInstance.value);
  elapsedTime.value = time;
  isTimerRunning.value = false;
};

onMounted(() => {
  // When this component mounts, we will set all the question data needed for this page.
  const revisitedQuestion = useQuizStore().revisitedQuestion;

  if (revisitedQuestion !== null) {
    currentQuestionIndex.value = revisitedQuestion;
    currentUserAnswer.value =
      useQuizStore().getUserAnswerByIndex(revisitedQuestion);
    currentQuestion.value =
      useQuizStore().getQuestionByIndex(revisitedQuestion);
    elapsedTime.value = useQuizStore().getUserTimeByIndex(revisitedQuestion);
    forceEnableReviewMode.value = true;
  }

  if (revisitedQuestion === null) {
    currentQuestion.value = useQuizStore().getQuestionByIndex(
      currentQuestionIndex.value,
    );
    forceEnableReviewMode.value = false;
  }

  totalQuestions.value = useQuizStore().questions.length;
  startTimer();
});

watch(
  () => currentQuestionIndex.value,
  (index) => {
    // Listen to the event where the currentQuestionIndex has been change.
    // When that is change, update the current question to the new one.
    currentQuestion.value = useQuizStore().getQuestionByIndex(index);
  },
);
</script>

<style scoped>
.elapsed-time {
  color: lightgreen;
  width: 50%;
}

.question {
  width: 50%;
}

.v-radio:hover {
  background-color: gray;
  border-radius: 8px;
  color: lightgreen;
  width: 50%;
}
</style>
