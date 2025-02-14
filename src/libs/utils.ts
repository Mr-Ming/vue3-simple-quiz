import { QUIZ_CATEGORY_LIST, QUIZ_HEADINGS } from "@/libs/constants";

/**
 * Decode html characters.
 * @param string text
 * @returns string the decoded text
 */
export const decodeHtml = (text: string): string => {
  const doc = new DOMParser().parseFromString(text, "text/html");
  return doc?.documentElement?.textContent || "";
};

/**
 * Decode an array of strings that may contain html characters.
 * @param string[] items An array of strings.
 * @returns string[] An array of decoded strings.
 */
export const decodeHtmlAll = (items: string[]): string[] => {
  return items.map((item: string): string => {
    return decodeHtml(item) || "";
  });
};

/**
 * Format time into a user-friendly format.
 * @param number time The time in seconds.
 * @returns string The time in a user-friendly format.
 */
export const formatTime = (time: number): string => {
  if (time === 0) {
    return "Under 1s";
  }

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const result = [];

  if (hours > 0) {
    result.push(`${hours}h`);
  }

  if (minutes > 0) {
    result.push(`${minutes}m`);
  }

  if (seconds > 0 || !result) {
    result.push(`${seconds}s`);
  }

  return result.join(" ");
};

/**
 * Get category URL by Parameter
 * @param string selectedCategory The quiz category to select from.
 * @returns string The url param that is built.
 */
export const getCategoryUrlParam = (selectedCategory: string): string => {
  const index = QUIZ_CATEGORY_LIST.findIndex(
    (item) => item.name === selectedCategory,
  );
  const categoryId = QUIZ_CATEGORY_LIST[index].id;

  return categoryId ? `&category=${categoryId}` : "";
};

/**
 * Get the quiz stage heading.
 * @param string stage The quiz stage.
 * @returns string The heading for that quiz stage.
 */
export const getStageHeading = (stage: string): string => {
  const index = QUIZ_HEADINGS.findIndex((item) => item.stage === stage);
  return QUIZ_HEADINGS[index].heading;
};

/**
 * Sort the quiz choices.
 * @param string[] items An array of choices.
 * @returns string[] An array of choices sorted in the defined order mention in the inline-comment.
 */
export const sortItems = (items: string[]): string[] => {
  let isAllNumeric = true;

  items.forEach((item) => {
    if (!Number.parseFloat(item)) {
      isAllNumeric = false;
    }
  });

  // Number is sorted in smallest to largest.
  if (isAllNumeric) {
    return items.sort((a, b) => Number.parseFloat(a) - Number.parseFloat(b));
  }

  // true/false are sorted in descending order.
  if (items.length === 2 && items.includes("False") && items.includes("True")) {
    return items.sort((a, b) => b.localeCompare(a));
  }

  // All other Letters are sorted alphabetically.
  return items.sort((a, b) => a.localeCompare(b));
};
