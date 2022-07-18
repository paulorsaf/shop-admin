import { Product } from "src/app/model/product/product";

export type ProductDetailState = {
    error: any;
    isLoaded: boolean;
    isLoading: boolean;
    isLoadedStock: boolean;
    isLoadingStock: boolean;
    isSaved: boolean;
    isSaving: boolean;
    isSavedStock: boolean;
    isSavingStock: boolean;
    product?: Product;
    stock: any[];
}