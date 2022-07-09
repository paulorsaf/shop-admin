import { Category } from "src/app/model/category/category";

export type CategoryDetailState = {
    error: any;
    isLoaded: boolean;
    isLoading: boolean;
    isSaved: boolean;
    isSaving: boolean;
    category?: Category;
}