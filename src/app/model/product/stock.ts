export type Stock = {
    id: string;
    stockOptions: StockOption[];
}

export type StockOption = {
    id: string;
    quantity: number;
    color?: string;
    size?: string;
}

export type AddStock = {
    color: string;
    quantity: number;
    size: string;
}