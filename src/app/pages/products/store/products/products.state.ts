import { Product } from "src/app/model/product/product";

export type ProductsState = {
    error: any;
    isLoaded: boolean;
    isLoading: boolean;
    isRemoved: boolean;
    isRemoving: boolean;
    products: Product[];
}