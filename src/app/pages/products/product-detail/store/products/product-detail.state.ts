import { Product } from "src/app/model/product/product";

export type ProductDetailState = {
    error: any;
    isLoaded: boolean;
    isLoading: boolean;
    product?: Product;
}