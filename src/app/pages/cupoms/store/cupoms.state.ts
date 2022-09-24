import { Cupom } from "src/app/model/cupom/cupom";

export type CupomsState = {
    error: any;
    isLoaded: boolean;
    isLoading: boolean;
    isSaved: boolean;
    isSaving: boolean;
    cupoms: Cupom[];
}