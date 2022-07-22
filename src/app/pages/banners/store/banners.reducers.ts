import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from 'src/app/store/app-initial-state';
import { loadBanners, loadBannersFail, loadBannersSuccess, removeBanner, removeBannerFail, removeBannerSuccess } from './banners.actions';
import { BannersState } from './banners.state';

const initialState: BannersState = AppInitialState.banners;

const _bannersReducer = createReducer(initialState,
    on(loadBanners, (state) => {
        return {
            ...state,
            banners: [],
            error: null,
            isLoaded: false,
            isLoading: true
        };
    }),
    on(loadBannersSuccess, (state, action) => {
        return {
            ...state,
            banners: action.banners,
            isLoaded: true,
            isLoading: false
        };
    }),
    on(loadBannersFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isLoaded: false,
            isLoading: false
        };
    }),
    on(removeBanner, (state) => {
        return {
            ...state,
            error: null,
            isRemoved: false,
            isRemoving: true
        };
    }),
    on(removeBannerSuccess, (state) => {
        return {
            ...state,
            isRemoved: true,
            isRemoving: false
        };
    }),
    on(removeBannerFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isRemoved: false,
            isRemoving: false
        };
    })
);
 
export function bannersReducer(state: BannersState, action: any) {
  return _bannersReducer(state, action);
}