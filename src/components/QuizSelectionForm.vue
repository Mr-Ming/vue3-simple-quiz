<template>
  <v-snackbar v-model="showSnackbar" color="error" rounded="pill">
    {{ QUIZ_ERROR_EXTERNAL_QUESTIONS_LOADING_FAIL }}
    <template v-slot:actions>
      <v-btn variant="text" @click="showSnackbar = false"> Close </v-btn>
    </template>
  </v-snackbar>

  <v-select
    class="mb-3"
    label="Select Category"
    :items="categoryList"
    v-model="selectedCategory"
    width="50%"
  />
  <v-select
    class="mb-3"
    label="Select Number of Question"
    :items="QUIZ_NUMBER_OF_QUESTION_LIST"
    v-model="selectedNumberOfQuestion"
    width="50%"
  />
  <v-btn
    class="mt-4"
    color="success"
    variant="elevated"
    @click="handleSelectQuiz"
    width="50%"
    >Select Quiz</v-btn
  >
</template>

<script setup lang="ts">
import { ref } from "vue";
import sample_questions from "@/assets/sample_questions.json";
import {
  QUIZ_BASE_URL,
  QUIZ_CATEGORY_LIST,
  QUIZ_ERROR_EXTERNAL_QUESTIONS_LOADING_FAIL,
  QUIZ_NUMBER_OF_QUESTION_LIST,
  QUIZ_STAGE_INSTRUCTION,
} from "@/libs/constants";
import { getCategoryUrlParam } from "@/libs/utils";
import { useQuizStore } from "@/stores/quiz";

const categoryList = QUIZ_CATEGORY_LIST.map((category) => category.name);

const selectedCategory = ref<string>(QUIZ_CATEGORY_LIST[0].name);
const selectedNumberOfQuestion = ref<number>(QUIZ_NUMBER_OF_QUESTION_LIST[0]);
const showSnackbar = ref<boolean>(false);

/**
 * Handle the case where user click on select quiz button.
 */
const handleSelectQuiz = async () => {
  try {
    const response = await fetch(
      `${QUIZ_BASE_URL}amount=${selectedNumberOfQuestion.value}${getCategoryUrlParam(selectedCategory.value)}`,
    );
    const data = await response.json();

    if (!data?.results?.length) {
      throw new Error("No questions found");
    }

    useQuizStore().setQuestions(data.results);
    useQuizStore().setCurrentStage(QUIZ_STAGE_INSTRUCTION);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error encounter while loading quiz question externally:', error.message);
    } else {
      console.error('Error encounter while loading quiz question externally:', error);
    }

    showSnackbar.value = true;

    // Fail to load questions from external server, display snackbar to user for 3s and load from internal source.
    await setTimeout(async () => {
      const data = sample_questions;
      useQuizStore().setQuestions(data.results);
      useQuizStore().setCurrentStage(QUIZ_STAGE_INSTRUCTION);
    }, 3000);
  }
};
</script>

<style scoped></style>
