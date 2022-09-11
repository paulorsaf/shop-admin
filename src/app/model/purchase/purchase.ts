export type Purchase = {
    address: any;
    createdAt: string;
    id: string;
    payment: {
        error: any;
        receiptUrl: string;
        type: string;
    };
    price: Price;
    products: PurchaseProduct[];
    status: string;
    totalAmount: number;
    totalPrice: number;
    user: {
        email: string;
        id: string;
    }
}

type Price = {
    products: number;
    delivery: number;
    paymentFee: number;
    total: number;
    totalWithPaymentFee: number;
}

export type PurchaseProduct = {
    amount: number;
    name: string;
    price: number;
    priceWithDiscount: number;
}