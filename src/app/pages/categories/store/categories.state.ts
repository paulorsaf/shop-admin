import { Category } from "src/app/model/category/category";

export type CategoriesState = {
    error: any;
    isLoaded: boolean;
    isLoading: boolean;
    categories: Category[];
}