export type Product = {
    categoryId: string;
    description: string;
    id: string;
    images: ProductImage[];
    isVisible: boolean;
    name: string;
    price: number;
    priceWithDiscount: number;
    productInternalId?: string;
    unit: string;
    weight: number;
}

export type ProductImage = {
    fileName: string;
    imageUrl: string
}