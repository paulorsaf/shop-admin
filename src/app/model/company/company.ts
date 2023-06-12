import { Address } from "../address/address";

export type CompanyDetails = {
    facebook: string;
    instagram: string;
    name: string;
    website: string;
    whatsapp: string;
}

export type Company = {
    aboutUs: string;
    address: Address;
    canUpdateStock: boolean;
    cityDeliveryPrice: number;
    hasDeliveryByMail: boolean;
    hasToSendPurchaseToOwnSystem: boolean;
    id: string;
    logo: Image;
    payment: Payment;
    serviceTax: number;
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