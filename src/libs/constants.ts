export const QUIZ_BASE_URL = "https://opentdb.com/api.php?";

export const QUIZ_CATEGORY_LIST = [
  {
    id: "",
    name: "Any Category",
  },
  {
    id: 9,
    name: "General Knowledge",
  },
  {
    id: 10,
    name: "Entertainment: Books",
  },
  {
    id: 11,
    name: "Entertainment: Film",
  },
  {
    id: 12,
    name: "Entertainment: Music",
  },
  {
    id: 13,
    name: "Entertainment: Musicals & Theatres",
  },
  {
    id: 14,
    name: "Entertainment: Television",
  },
  {
    id: 15,
    name: "Entertainment: Video Games",
  },
  {
    id: 16,
    name: "Entertainment: Board Games",
  },
  {
    id: 17,
    name: "Science & Nature",
  },
  {
    id: 18,
    name: "Science: Computers",
  },
  {
    id: 19,
    name: "Science: Mathematics",
  },
  {
    id: 20,
    name: "Mythology",
  },
  {
    id: 21,
    name: "Sports",
  },
  {
    id: 22,
    name: "Geography",
  },
  {
    id: 23,
    name: "History",
  },
  {
    id: 24,
    name: "Politics",
  },
  {
    id: 25,
    name: "Art",
  },
  {
    id: 26,
    name: "Celebrities",
  },
  {
    id: 27,
    name: "Animals",
  },
  {
    id: 28,
    name: "Vehicles",
  },
  {
    id: 29,
    name: "Entertainment: Comics",
  },
  {
    id: 30,
    name: "Science: Gadgets",
  },
  {
    id: 31,
    name: "Entertainment: Japanese Anime & Manga",
  },
  {
    id: 32,
    name: "Entertainment: Cartoon & Animations",
  },
];

export const QUIZ_ERROR_INVALID_ANSWER =
  "Please select an answer before moving next.";
export const QUIZ_ERROR_EXTERNAL_QUESTIONS_LOADING_FAIL =
  "Fail to load external question, we will use our internal question list instead.";

export const QUIZ_NUMBER_OF_QUESTION_LIST = [10, 15, 20];

export const QUIZ_HEADING_EXAMINATION = "Quiz Examination";
export const QUIZ_HEADING_INSTRUCTION = "Quiz Instruction";
export const QUIZ_HEADING_RESULT = "Quiz Result";
export const QUIZ_HEADING_REVIEW = "Quiz Review";
export const QUIZ_HEADING_SELECTION = "Quiz Selection";

export const QUIZ_STAGE_EXAMINATION = "examination";
export const QUIZ_STAGE_INSTRUCTION = "instruction";
export const QUIZ_STAGE_RESULT = "result";
export const QUIZ_STAGE_REVIEW = "review";
export const QUIZ_STAGE_SELECTION = "selection";

export const QUIZ_HEADINGS = [
  { stage: QUIZ_STAGE_EXAMINATION, heading: QUIZ_HEADING_EXAMINATION },
  { stage: QUIZ_STAGE_INSTRUCTION, heading: QUIZ_HEADING_INSTRUCTION },
  { stage: QUIZ_STAGE_RESULT, heading: QUIZ_HEADING_RESULT },
  { stage: QUIZ_STAGE_REVIEW, heading: QUIZ_HEADING_REVIEW },
  { stage: QUIZ_STAGE_SELECTION, heading: QUIZ_HEADING_SELECTION },
];

export const QUIZ_FIELD_TYPE_CORRECT = "field-correct";
export const QUIZ_FIELD_TYPE_INCORRECT = "field-incorrect";
export const QUIZ_FIELD_TYPE_UNKNOWN = "field-unknown";
