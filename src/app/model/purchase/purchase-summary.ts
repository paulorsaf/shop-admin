export type PurchaseSummary = {
    createdAt: string;
    id: string;
    payment: {
        error: any;
        receiptUrl: string;
        type: string;
    }
    status: string;
    totalAmount: number;
    totalPrice: number;
    user: {
        email: string;
        id: string;
    }
}