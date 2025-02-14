import { createPinia, setActivePinia } from "pinia";
import { describe, it, expect, beforeEach } from "vitest";

import { QUIZ_STAGE_SELECTION, QUIZ_STAGE_INSTRUCTION } from "@/libs/constants";
import { useQuizStore } from "@/stores/quiz";

describe("Quiz Store", () => {
  const mockQuestions = [
    {
      type: "multiple",
      difficulty: "easy",
      category: "Vehicles",
      question: "What UK Train does NOT go over 125MPH?",
      correct_answer: "Sprinter",
      incorrect_answers: ["Class 43", "Javelin", "Pendolino"],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Entertainment: Video Games",
      question:
        "Which &quot;Call Of Duty: Zombies&quot; map introduced the &quot;Staffs Of The Ancients&quot;?",
      correct_answer: "Origins",
      incorrect_answers: ["Shangri-La", "Revelations", "Nuketown"],
    },
  ];

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("Handle Valid Case", () => {
    it("initial state is correct.", () => {
      expect(useQuizStore().currentStage).toEqual(QUIZ_STAGE_SELECTION);
      expect(useQuizStore().questions).toEqual([]);
      expect(useQuizStore().revisitedQuestion).toEqual(null);
      expect(useQuizStore().userAnswers).toEqual([]);
    });

    it("setCurrentStage is properly setting value.", () => {
      useQuizStore().setCurrentStage(QUIZ_STAGE_INSTRUCTION);
      expect(useQuizStore().currentStage).toEqual(QUIZ_STAGE_INSTRUCTION);
    });

    it("setUserAnswer / getUserAnswerByIndex / getUserTimeByIndex is properly setting/fetching value.", () => {
      useQuizStore().setUserAnswer(1, "Nuketown", 5);

      expect(useQuizStore().getUserAnswerByIndex(1)).toEqual("Nuketown");
      expect(useQuizStore().getUserTimeByIndex(1)).toEqual(5);
    });

    it("setRevisitedQuestion is properly setting value.", () => {
      useQuizStore().setRevisitedQuestion(5);
      expect(useQuizStore().revisitedQuestion).toEqual(5);
    });

    it("setQuestions / getQuestionByIndex is properly setting/fetching value.", () => {
      useQuizStore().setQuestions(mockQuestions);

      expect(useQuizStore().questions).toEqual([
        {
          type: "multiple",
          difficulty: "easy",
          category: "Vehicles",
          question: "What UK Train does NOT go over 125MPH?",
          correct_answer: "Sprinter",
          incorrect_answers: ["Class 43", "Javelin", "Pendolino"],
          choices: ["Class 43", "Javelin", "Pendolino", "Sprinter"],
        },
        {
          type: "multiple",
          difficulty: "easy",
          category: "Entertainment: Video Games",
          question:
            'Which "Call Of Duty: Zombies" map introduced the "Staffs Of The Ancients"?',
          correct_answer: "Origins",
          incorrect_answers: ["Shangri-La", "Revelations", "Nuketown"],
          choices: ["Nuketown", "Origins", "Revelations", "Shangri-La"],
        },
      ]);

      expect(useQuizStore().getQuestionByIndex(1)).toEqual({
        choices: ["Nuketown", "Origins", "Revelations", "Shangri-La"],
        question:
          'Which "Call Of Duty: Zombies" map introduced the "Staffs Of The Ancients"?',
      });
    });

    it("setQuestions / setUserAnswer / getQuestionsWithUserAnswer is properly setting/fetching value.", () => {
      useQuizStore().setQuestions(mockQuestions);
      useQuizStore().setUserAnswer(0, "Javelin", 3);
      useQuizStore().setUserAnswer(1, "Nuketown", 5);

      expect(useQuizStore().getQuestionsWithUserAnswer()).toEqual([
        {
          correctAnswer: "Sprinter",
          fieldType: "field-incorrect",
          index: 0,
          isUserCorrect: false,
          questions: "What UK Train does NOT go over 125MPH?",
          userAnswer: "Javelin",
          userTimer: 3,
        },
        {
          correctAnswer: "Origins",
          fieldType: "field-incorrect",
          index: 1,
          isUserCorrect: false,
          questions:
            'Which "Call Of Duty: Zombies" map introduced the "Staffs Of The Ancients"?',
          userAnswer: "Nuketown",
          userTimer: 5,
        },
      ]);
    });

    it("setQuestions / setUserAnswer / getQuizResult is properly setting/fetching value.", () => {
      useQuizStore().setQuestions(mockQuestions);
      useQuizStore().setUserAnswer(0, "Sprinter", 3);
      useQuizStore().setUserAnswer(1, "Nuketown", 5);

      expect(useQuizStore().getQuizResult()).toEqual({
        totalAnswerCorrect: 1,
        totalAnswerIncorrect: 1,
        totalQuestions: 2,
        totalTimeSpent: 8,
      });
    });
  });

  describe("Handle Invalid Case", () => {
    it("setQuestions can properly handle invalid data with missing choices and correct answer.", () => {
      useQuizStore().setQuestions([
        ...mockQuestions,
        {
          type: "multiple",
          questions: "What is 5+5?",
        },
      ]);

      expect(useQuizStore().questions).toEqual([
        {
          type: "multiple",
          difficulty: "easy",
          category: "Vehicles",
          question: "What UK Train does NOT go over 125MPH?",
          correct_answer: "Sprinter",
          incorrect_answers: ["Class 43", "Javelin", "Pendolino"],
          choices: ["Class 43", "Javelin", "Pendolino", "Sprinter"],
        },
        {
          type: "multiple",
          difficulty: "easy",
          category: "Entertainment: Video Games",
          question:
            'Which "Call Of Duty: Zombies" map introduced the "Staffs Of The Ancients"?',
          correct_answer: "Origins",
          incorrect_answers: ["Shangri-La", "Revelations", "Nuketown"],
          choices: ["Nuketown", "Origins", "Revelations", "Shangri-La"],
        },
      ]);
    });

    it("getQuestionsWithUserAnswer can properly handle invalid data with missing user's answer", () => {
      useQuizStore().setQuestions(mockQuestions);

      expect(useQuizStore().getQuestionsWithUserAnswer()).toEqual([
        {
          correctAnswer: "Sprinter",
          fieldType: "field-incorrect",
          index: 0,
          isUserCorrect: false,
          questions: "What UK Train does NOT go over 125MPH?",
          userAnswer: undefined,
        },
        {
          correctAnswer: "Origins",
          fieldType: "field-incorrect",
          index: 1,
          isUserCorrect: false,
          questions:
            'Which "Call Of Duty: Zombies" map introduced the "Staffs Of The Ancients"?',
          userAnswer: undefined,
        },
      ]);
    });

    it("getQuizResult can properly handle invalid data with missing user's answer", () => {
      useQuizStore().setQuestions(mockQuestions);

      expect(useQuizStore().getQuizResult()).toEqual({
        totalAnswerCorrect: 0,
        totalAnswerIncorrect: 2,
        totalQuestions: 2,
        totalTimeSpent: 0,
      });
    });
  });
});
