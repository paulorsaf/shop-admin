import { Product } from "src/app/model/product/product";

export type ProductsState = {
    error: any;
    hasMoreToLoad: boolean;
    isLoaded: boolean;
    isLoading: boolean;
    isLoadingMoreProducts: boolean;
    isRemoved: boolean;
    isRemoving: boolean;
    page: number;
    products: Product[];
}