import { Address } from "../address/address";

export type Company = {
    aboutUs: string;
    address: Address;
    id: string;
    logo: Image;
    name: string;
    payment: Payment;
    pixKey: string;
}

export type Image = {
    imageUrl: string;
}

export type Payment = {
    creditCard: {
        fee: {
            percentage: number;
            value: number;
        },
        flags: string[]
    },
    money: boolean;
    pixKey: string;
}