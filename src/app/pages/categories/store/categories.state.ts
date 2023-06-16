import { Category } from "src/app/model/category/category";

export type CategoriesState = {
    categoryDetailId?: string;
    error: any;
    isLoaded: boolean;
    isLoading: boolean;
    isRemoved: boolean;
    isRemoving: boolean;
    categories: Category[];
}

export const categoriesInitialState: CategoriesState = {
    categoryDetailId: undefined,
    categories: [],
    error: null,
    isLoaded: false,
    isLoading: false,
    isRemoved: false,
    isRemoving: false,
}