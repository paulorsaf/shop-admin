import { Category } from "src/app/model/category/category";

export type CategoriesState = {
    error: any;
    isLoaded: boolean;
    isLoading: boolean;
    isRemoved: boolean;
    isRemoving: boolean;
    categories: Category[];
}