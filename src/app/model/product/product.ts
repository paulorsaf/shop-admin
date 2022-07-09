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

export type Category = {
    id: string;
    name: string;
}