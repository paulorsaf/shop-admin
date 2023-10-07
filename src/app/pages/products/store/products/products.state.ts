import { Product } from "src/app/model/product/product";
import { ProductsFilter } from "./products.actions";

export type ProductsState = {
    error: any;
    filter?: ProductsFilter;
    hasMoreToLoad: boolean;
    isFiltering: boolean;
    isLoaded: boolean;
    isLoading: boolean;
    isLoadingMoreProducts: boolean;
    isLoadingProductDetail: boolean;
    isRemoved: boolean;
    isRemoving: boolean;
    isUploading: boolean;
    page: number;
    products: Product[];
    productDetailId?: string;
}