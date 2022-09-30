export type Stock = {
    id: string;
    quantity: number;
    color?: string;
    size?: string;
}

export type AddStock = {
    color?: string;
    quantity: number;
    size?: string;
}

export type UpdateStockOption = {
    id: string;
} & AddStock