export type Purchase = {
    address: any;
    createdAt: string;
    id: string;
    payment: {
        error: any;
        receiptUrl: string;
        type: string;
    };
    products: PurchaseProduct[];
    status: string;
    totalAmount: number;
    totalPrice: number;
    user: {
        email: string;
        id: string;
    }
}

export type PurchaseProduct = {
    amount: number;
    name: string;
    price: number;
    priceWithDiscount: number;
}