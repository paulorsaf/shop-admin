import { Banner } from "src/app/model/banner/banner";

export type BannerDetailState = {
    banner?: Banner;
    error: any;
    isLoaded: boolean;
    isLoading: boolean;
    isSaved: boolean;
    isSaving: boolean;
}