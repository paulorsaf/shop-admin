import { createAction, props } from "@ngrx/store";
import { Banner } from "src/app/model/banner/banner";

export const loadBanners = createAction('[Banners] load');
export const loadBannersSuccess = createAction('[Banners] load success', props<{banners: Banner[]}>());
export const loadBannersFail = createAction('[Banners] load fail', props<{error: any}>());

export const removeBanner = createAction('[Banners] remove', props<{banner: Banner}>());
export const removeBannerSuccess = createAction('[Banners] remove success');
export const removeBannerFail = createAction('[Banners] remove fail', props<{error: any}>());