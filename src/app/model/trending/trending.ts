import { Product } from "../product/product";

export type Trending = {
    id: string;
    productId: string;
}

export type TrendingProduct = {
    id: string;
    product: Product;
}

export type SaveTrending = {
    id?: string;
    productId: string;
}