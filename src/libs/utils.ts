import { QUIZ_CATEGORY_LIST } from '@/libs/constants';

export const getCategoryUrlParam = (selectedCategory: string): string => {
    const index = QUIZ_CATEGORY_LIST.findIndex(item => item.name === selectedCategory);
    const categoryId = QUIZ_CATEGORY_LIST[index].id;

    return categoryId ? `&category=${categoryId}` : '';
}