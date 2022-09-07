import { Address } from "../address/address";

export type Company = {
    aboutUs: string;
    address: Address;
    id: string;
    logo: Image;
    name: string;
    pixKey: string;
}

export type Image = {
    imageUrl: string;
}