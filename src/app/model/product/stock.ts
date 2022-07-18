export type Stock = {
    id: string;
    productId: string;
    
    color: string;
    quantity: number;
    size: string;
}

export type AddStock = {
    color: string;
    quantity: number;
    size: string;
}