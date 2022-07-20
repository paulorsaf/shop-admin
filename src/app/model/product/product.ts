export type Product = {
    categoryId: string;
    colors: string[];
    id: string;
    images: ProductImage[];
    name: string;
    price: number;
    priceWithDiscount: number;
    sizes: string[];
}

export type ProductImage = {
    fileName: string;
    imageUrl: string
}