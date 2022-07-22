import { Banner } from "src/app/model/banner/banner";

export type BannersState = {
    error: any;
    isLoaded: boolean;
    isLoading: boolean;
    isRemoved: boolean;
    isRemoving: boolean;
    banners: Banner[];
}