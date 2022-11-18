export type Purchase = {
    address: any;
    createdAt: string;
    hasBeenSentToSystem: boolean;
    id: string;
    payment: {
        error: any;
        receiptUrl: string;
        type: string;
    };
    price: Price;
    productNotes: ProductNotes[];
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
    discount: number;
    paymentFee: number;
    total: number;
    totalWithPaymentFee: number;
}

export type PurchaseProduct = {
    id: string;
    amount: number;
    name: string;
    price: number;
    priceWithDiscount: number;
}

type ProductNotes = {
    notes: string;
    productId: string;
}