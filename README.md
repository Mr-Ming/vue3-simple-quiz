# vue3-simple-quiz
A very simple vue3 quiz app that fetches quiz questions from [https://opentdb.com/api_config.php](https://opentdb.com/api_config.php)
* It will also fetch quiz questions [internally](https://github.com/Mr-Ming/vue3-simple-quiz/blob/main/src/assets/sample_questions.json) if the external api fails.

The feature includes:
1) Selecting the type of quiz you want to take.
2) Ability to go back and forth between each questions.
* Note: To jump to the next question, you must answer the current questions.
3) A timer and progress to keep track.
4) A review page to review your answer and re-select.
* Note: If you choose to re-select your answer, you can also quickly jump back to the review page.
5) A result page to view your result.

# Table of Contents
2. [Setup Requirements](#setup-requirements)
3. [Setup Instructions](#setup-instructions)
4. [Running dev server](#running-dev-server)
5. [Running unit test and linter](#running-unit-test-and-linter)
6. [Recorded Demo](#recorded-demo)
7. [Technical Decision](#technical-decision)
8. [Screenshot](#screenshot)

## Setup Requirements
Ensure that you have:
1. Brew setup https://brew.sh/
2. Npm setup https://formulae.brew.sh/formula/node
3. Pnpm setup https://pnpm.io/installation#using-homebrew

## Setup Instructions
1. Clone this repo via `git clone`
2. Install dependencies via `pnpm i`

## Running dev server
You can run the dev server via `pnpm start`

## Running unit test and linter
You can run unit test via `pnpm test`

For linter, you can run via `pnpm lint`
* For autoformatting, you can run via `pnpm format`

## Recorded Demo
Recorded Demo is split between external and internal quiz.

For external quiz (we retrieve the quiz from [https://opentdb.com/api_config.php](https://opentdb.com/api_config.php))
* [External Quiz Demo](https://drive.google.com/file/d/154dlATsafCnfs1rIIsBjJl4KdPhv5CxE/view?usp=sharing)

For internal quiz (we retrieve the quiz questions from [this repo](https://github.com/Mr-Ming/vue3-simple-quiz/blob/main/src/assets/sample_questions.json)
* [Internal Quiz Demo](https://drive.google.com/file/d/1FCw8jFIEhpq7hC1KV9EbI7FwysAUap3g/view?usp=sharing))

## Technical Decision
1. Why vue app? It is because there is already many ReactJS app for this quiz that I want this one to stand out.
2) Why `pnpm` over `npm` or `yarn`? Performance, `pnpm` is both better in term of performances and efficiency. [Reference](https://www.geeksforgeeks.org/pnpm-vs-npm/#difference-between-pnpm-and-npm)
3) What factor contribute to the current cosmetic styling of this app? I wanted it to align with the dark-mode flavor of vue.
4) Why use `Vuetify` for these form components? Vuetify is popular for Vue and using it will make this app more streamline. (not to mention speed up implementation)
5) Why `pinia` over `vuex`? I am a die-hard fan of Pinia for its simplicity, which makes code more easier to work with and performant, better unit test can be written with pinia. [Reference](https://www.vuemastery.com/blog/advantages-of-pinia-vs-vuex/)
6) How come there is only 1 unit test? Due to time constraint, I only added one unit test for now and that is for the critical pinia store piece which is less volatile compare to ui/ux designs which can change frequently. 


## Screenshot
### Selection Page
![Quiz Selection Page](https://github.com/Mr-Ming/vue3-simple-quiz/blob/main/readme-assets/quiz-selection.png)

### Instruction Page
![Quiz Instruction Page](https://github.com/Mr-Ming/vue3-simple-quiz/blob/main/readme-assets/quiz-instruction.png)

### Examination Page
![Quiz Examination Page](https://github.com/Mr-Ming/vue3-simple-quiz/blob/main/readme-assets/quiz-examination.png)

### Review Page
![Quiz Review Page](https://github.com/Mr-Ming/vue3-simple-quiz/blob/main/readme-assets/quiz-review.png)

### Result Page
![Quiz Result Page](https://github.com/Mr-Ming/vue3-simple-quiz/blob/main/readme-assets/quiz-result.png)

### Unit Test
![Unit Test](https://github.com/Mr-Ming/vue3-simple-quiz/blob/main/readme-assets/unit-test.png)
