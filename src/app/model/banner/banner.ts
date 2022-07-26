import { Product } from "../product/product";

export type Banner = {
    id: string;
    productId: string;
}

export type BannerProduct = {
    id: string;
    product: Product;
}

export type SaveBanner = {
    id?: string;
    productId: string;
}