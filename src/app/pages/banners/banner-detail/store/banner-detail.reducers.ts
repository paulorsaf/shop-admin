import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from 'src/app/store/app-initial-state';
import { clearBannerDetail, loadBannerDetail, loadBannerDetailFail, loadBannerDetailSuccess, saveBannerDetail, saveBannerDetailFail, saveBannerDetailSuccess } from './banner-detail.actions';
import { BannerDetailState } from './banner-detail.state';

const initialState: BannerDetailState = AppInitialState.bannerDetail;

const _bannerDetailReducer = createReducer(initialState,
    on(loadBannerDetail, (state) => {
        return {
            ...state,
            banner: undefined,
            error: null,
            isLoaded: false,
            isLoading: true
        };
    }),
    on(loadBannerDetailSuccess, (state, action) => {
        return {
            ...state,
            banner: action.banner,
            isLoaded: true,
            isLoading: false
        };
    }),
    on(loadBannerDetailFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isLoaded: false,
            isLoading: false
        };
    }),
    on(saveBannerDetail, (state) => {
        return {
            ...state,
            error: null,
            isSaved: false,
            isSaving: true
        };
    }),
    on(saveBannerDetailSuccess, (state) => {
        return {
            ...state,
            isSaved: true,
            isSaving: false
        };
    }),
    on(saveBannerDetailFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isSaved: false,
            isSaving: false
        };
    }),
    on(clearBannerDetail, () => {
        return {
            ...initialState
        }
    })
);
 
export function bannerDetailReducer(state: BannerDetailState, action: any) {
  return _bannerDetailReducer(state, action);
}