import { createAction, props } from "@ngrx/store";
import { Banner, SaveBanner } from "src/app/model/banner/banner";

export const loadBannerDetail = createAction('[Banner detail] load', props<{id: string}>());
export const loadBannerDetailSuccess = createAction('[Banner detail] load success', props<{banner: Banner}>());
export const loadBannerDetailFail = createAction('[Banner detail] load fail', props<{error: any}>());

export const saveBannerDetail = createAction('[Banner detail] save', props<{banner: SaveBanner}>());
export const saveBannerDetailSuccess = createAction('[Banner detail] save success');
export const saveBannerDetailFail = createAction('[Banner detail] save fail', props<{error: any}>());

export const clearBannerDetail = createAction('[Banner detail] clear');