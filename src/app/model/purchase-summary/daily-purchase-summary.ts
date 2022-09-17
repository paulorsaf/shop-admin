export type DailyPurchaseSummary = {
    address: {latitude: number, longitude: number};
    createdAt: string;
    id: string;
    payment: Payment;
    price: number;
    products: PurchaseSummaryProduct[];
    status: string;
    user: User;
}

type Payment = {
    error: string;
    receiptUrl: string;
    type: string;
}

type PurchaseSummaryProduct = {
    id: string;
    amount: number;
    name: string;
    price: number;
    priceWithDiscount: number;
}

type User = {
    email: string;
    id: string;
}