import { Product } from "src/app/model/product/product";
import { Stock } from "src/app/model/product/stock";

export type ProductDetailState = {
    error: any;
    isEditedStock: boolean;
    isEditingStock: boolean;
    isLoaded: boolean;
    isLoading: boolean;
    isLoadedStock: boolean;
    isLoadingStock: boolean;
    isRemovedImage: boolean;
    isRemovingImage: boolean;
    isRemovedStock: boolean;
    isRemovingStock: boolean;
    isSaved: boolean;
    isSaving: boolean;
    isSavedStock: boolean;
    isSavingStock: boolean;
    isUpdatedStock: boolean;
    isUpdatingStock: boolean;
    isUploadedImage: boolean;
    isUploadingImage: boolean;
    product?: Product;
    stock?: Stock[];
}