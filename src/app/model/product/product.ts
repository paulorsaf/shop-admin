export type Product = {
    categoryId: string;
    description: string;
    id: string;
    images: ProductImage[];
    name: string;
    price: number;
    priceWithDiscount: number;
    unit: string;
    weight: number;
}

export type ProductImage = {
    fileName: string;
    imageUrl: string
}