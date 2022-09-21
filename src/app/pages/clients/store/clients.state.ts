import { Client } from "src/app/model/user/client";

export type ClientsState = {
    error: any;
    isLoaded: boolean;
    isLoading: boolean;
    clients: Client[];
}