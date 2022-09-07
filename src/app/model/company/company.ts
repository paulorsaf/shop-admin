import { Address } from "../address/address";

export type Company = {
    address: Address;
    id: string;
    logo: Image;
    name: string;
    pixKey: string;
}

export type Image = {
    imageUrl: string;
}