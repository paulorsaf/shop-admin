import { AppInitialState } from "src/app/store/app-initial-state";
import { loadBanners, loadBannersFail, loadBannersSuccess, removeBanner, removeBannerFail, removeBannerSuccess } from "./banners.actions";
import { bannersReducer } from "./banners.reducers";
import { BannersState } from "./banners.state";

describe('Banners store', () => {
    
    it('loadBanners', () => {
        const initialState: BannersState = {
            ...AppInitialState.banners,
            banners: [{}] as any,
            error: {},
            isLoaded: true,
            isLoading: false
        };

        const state = bannersReducer(initialState, loadBanners());

        expect(state).toEqual({
            ...AppInitialState.banners,
            banners: [],
            error: null,
            isLoaded: false,
            isLoading: true
        });
    });
    
    it('loadBannersSuccess', () => {
        const initialState: BannersState = {
            ...AppInitialState.banners,
            isLoading: true
        };

        const banners = [{id: 1}] as any;
        const state = bannersReducer(initialState, loadBannersSuccess({banners}));

        expect(state).toEqual({
            ...AppInitialState.banners,
            banners,
            isLoaded: true,
            isLoading: false
        });
    });
    
    it('loadBannersFail', () => {
        const initialState: BannersState = {
            ...AppInitialState.banners,
            isLoading: true
        };

        const error = {error: "error"} as any;
        const state = bannersReducer(initialState, loadBannersFail({error}));

        expect(state).toEqual({
            ...AppInitialState.banners,
            error,
            isLoaded: false,
            isLoading: false
        });
    });
    
    it('removeBanner', () => {
        const initialState: BannersState = {
            ...AppInitialState.banners,
            error: {},
            isRemoved: true,
            isRemoving: false
        };

        const banner = {id: 1} as any;
        const state = bannersReducer(initialState, removeBanner({banner}));

        expect(state).toEqual({
            ...AppInitialState.banners,
            error: null,
            isRemoved: false,
            isRemoving: true
        });
    });
    
    it('removeBannerSuccess', () => {
        const initialState: BannersState = {
            ...AppInitialState.banners,
            isRemoving: true
        };

        const state = bannersReducer(initialState, removeBannerSuccess());

        expect(state).toEqual({
            ...AppInitialState.banners,
            isRemoved: true,
            isRemoving: false
        });
    });
    
    it('removeBannerFail', () => {
        const initialState: BannersState = {
            ...AppInitialState.banners,
            isRemoving: true
        };

        const error = {error: "error"};
        const state = bannersReducer(initialState, removeBannerFail({error}));

        expect(state).toEqual({
            ...AppInitialState.banners,
            error,
            isRemoved: false,
            isRemoving: false
        });
    });
  
});