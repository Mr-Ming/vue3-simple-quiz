<template>
    <div>
        <h1 class="mb-4">Quiz Selection</h1>
        <v-select
            class="mb-3"
            label="Select Category"
            :items="categoryList"
            v-model="selectedCategory"
            
        />
        <v-select
            class="mb-3"
            label="Select Number of Question"
            :items="QUIZ_NUMBER_OF_QUESTION_LIST"
            v-model="selectedNumberOfQuestion"
        />
        <v-btn
            class="mt-4"
            color="primary"
            variant="outlined"
            @click="handleStartQuiz"
        >Start Quiz</v-btn>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { QUIZ_BASE_URL, QUIZ_CATEGORY_LIST, QUIZ_NUMBER_OF_QUESTION_LIST } from '@/libs/constants';
import { getCategoryUrlParam } from '@/libs/utils';
import { useQuizStore } from '@/stores/quiz';

const categoryList = QUIZ_CATEGORY_LIST.map((category) => category.name);

const selectedCategory = ref<string>(QUIZ_CATEGORY_LIST[0].name);
const selectedNumberOfQuestion = ref<number>(QUIZ_NUMBER_OF_QUESTION_LIST[0]);

const handleStartQuiz = async () => {
    try {
        const response = await fetch(`${QUIZ_BASE_URL}amount=${selectedNumberOfQuestion.value}${getCategoryUrlParam(selectedCategory.value)}`); 
        const data = await response.json();
        
        if (!data?.results?.length) {
            throw new Error('No questions found');
        }

        useQuizStore().setQuestions(data.results);
    } catch (err) {
        console.log('err', err);
        // error.value = err.message;
    } finally {
        // loading.value = false;
    }
    
}
</script>

<style scoped>
</style>