import { Category } from "src/app/model/category/category";

export type CategoryDetailState = {
    error: any;
    isChangingVisibility: boolean;
    isLoaded: boolean;
    isLoading: boolean;
    isSaved: boolean;
    isSaving: boolean;
    category?: Category;
}

export const categoryDetailInitialState: CategoryDetailState = {
    error: null,
    isChangingVisibility: false,
    isLoaded: false,
    isLoading: false,
    isSaved: false,
    isSaving: false,
    category: undefined
}