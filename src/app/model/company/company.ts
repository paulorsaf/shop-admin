import { Address } from "../address/address";

export type CompanyDetails = {
    name: string;
    facebook: string;
    instagram: string;
    website: string;
    whatsapp: string;
}

export type Company = {
    aboutUs: string;
    address: Address;
    canUpdateStock: boolean;
    hasToSendPurchaseToOwnSystem: boolean;
    id: string;
    logo: Image;
    payment: Payment;
} & CompanyDetails;

export type Image = {
    imageUrl: string;
}

export type Payment = {
    creditCard: {
        fee: {
            percentage: number;
            value: number;
        },
        flags: string[],
    },
    isPaymentAfterPurchase: boolean,
    money: boolean;
    pixKey: string;
}