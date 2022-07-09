import { Category } from "../category/category";

export type Product = {
    category: Category;
    colors: string[];
    id: string;
    images: string[];
    name: string;
    price: number;
    priceWithDiscount: number;
    sizes: string[];
}