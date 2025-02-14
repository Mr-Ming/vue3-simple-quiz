import { defineStore } from "pinia";
import { ref } from "vue";
import {
  QUIZ_FIELD_TYPE_CORRECT,
  QUIZ_FIELD_TYPE_INCORRECT,
  QUIZ_FIELD_TYPE_UNKNOWN,
  QUIZ_STAGE_REVIEW,
  QUIZ_STAGE_SELECTION,
} from "@/libs/constants";
import { decodeHtml, decodeHtmlAll, sortItems } from "@/libs/utils";

export const useQuizStore = defineStore("quiz", () => {
  // Initialize default state.
  const currentStage = ref<string>(QUIZ_STAGE_SELECTION);
  const questions = ref<object[]>([]);
  const revisitedQuestion = ref<number | null>(null);
  const userAnswers = ref<string[]>([]);

  /**
   * Get the questions by index.
   * @param number index The position of the question.
   * @returns object An object containing both choices and question.
   */
  const getQuestionByIndex = (index: number): object => {
    return {
      choices: questions.value[index]?.choices,
      question: questions.value[index]?.question,
    };
  };

  /**
   * Get the questions with user answer.
   * @returns object[] An array of object containing both user performance to each questions.
   */
  const getQuestionsWithUserAnswer = (): object[] => {
    return questions.value.map((item: object, index: number): object => {
      const isUserCorrect =
        item?.correct_answer === userAnswers.value[index]?.answer;

      return {
        correctAnswer: item?.correct_answer,
        fieldType:
          currentStage.value === QUIZ_STAGE_REVIEW
            ? QUIZ_FIELD_TYPE_UNKNOWN
            : isUserCorrect
              ? QUIZ_FIELD_TYPE_CORRECT
              : QUIZ_FIELD_TYPE_INCORRECT,
        index,
        isUserCorrect,
        questions: item?.question,
        userAnswer: userAnswers.value[index]?.answer,
        userTimer: userAnswers.value[index]?.timer,
      };
    });
  };

  /**
   * Get the quiz result.
   * @returns object An object containing the score.
   */
  const getQuizResult = (): object => {
    let totalAnswerCorrect = 0;
    let totalAnswerIncorrect = 0;
    let totalTimeSpent = 0;

    questions.value.forEach((item: object, index: number) => {
      if (userAnswers.value[index]?.timer) {
        totalTimeSpent += userAnswers.value[index]?.timer;
      }

      if (item?.correct_answer === userAnswers.value[index]?.answer) {
        totalAnswerCorrect++;
      }

      if (item?.correct_answer !== userAnswers.value[index]?.answer) {
        totalAnswerIncorrect++;
      }
    });

    return {
      totalAnswerCorrect,
      totalAnswerIncorrect,
      totalQuestions: totalAnswerCorrect + totalAnswerIncorrect,
      totalTimeSpent,
    };
  };

  /**
   * Get the user answer by index.
   * @param number index The position of the question.
   * @returns string The user answer for that question.
   */
  const getUserAnswerByIndex = (index: number): string => {
    return userAnswers.value[index]?.answer || "";
  };

  /**
   * Get the user time by index.
   * @param number index The position of the question.
   * @returns number The time it takes (in seconds) for the user to answer that question.
   */
  const getUserTimeByIndex = (index: number): number => {
    return userAnswers.value[index]?.timer || 0;
  };

  /**
   * Set the current quiz stage.
   * @param string stage The quiz stage to set it to.
   */
  const setCurrentStage = (stage: string) => {
    currentStage.value = stage;
  };

  /**
   * Set the question that the user want to revisit.
   * @param number index The position of the question.
   */
  const setRevisitedQuestion = (index: null | number) => {
    revisitedQuestion.value = index;
  };

  /**
   * Set the array of questions.
   * @param object[] newQuestions An array of objects containing the question and choices
   */
  const setQuestions = (newQuestions: object[]) => {
    questions.value = newQuestions
      .map((item: object) => {
        if (!item?.incorrect_answers?.length || !item.correct_answer) {
          return;
        }

        return {
          ...item,
          question: decodeHtml(item?.question),
          choices: decodeHtmlAll(
            sortItems([...item.incorrect_answers, item.correct_answer]),
          ),
        };
      })
      .filter((item) => item !== undefined);
  };

  /**
   * Set the user answer along with time taken for that question.
   * @param number index The position of the question.
   * @param string answer Their selected answer.
   * @param number timer The time they took for that question.
   */
  const setUserAnswer = (index: number, answer: string, timer: number) => {
    userAnswers.value[index] = {
      answer,
      timer,
    };
  };

  return {
    currentStage,
    questions,
    revisitedQuestion,
    userAnswers,
    getQuestionByIndex,
    getQuestionsWithUserAnswer,
    getQuizResult,
    getUserAnswerByIndex,
    getUserTimeByIndex,
    setCurrentStage,
    setQuestions,
    setRevisitedQuestion,
    setUserAnswer,
  };
});
