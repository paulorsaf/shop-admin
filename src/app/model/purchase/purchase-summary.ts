import { Address } from "../address/address";

export type PurchaseSummary = {
    address: Address;
    createdAt: string;
    id: string;
    payment: {
        changeFor: number;
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