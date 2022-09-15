import { Address } from "../address/address";

export type PurchaseSummary = {
    address: Address;
    createdAt: string;
    id: string;
    payment: {
        error: any;
        receiptUrl: string;
        type: string;
    }
    status: string;
    totalAmount: number;
    totalWithPaymentFee: number;
    user: {
        email: string;
        id: string;
    }
}