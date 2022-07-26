import { AppInitialState } from "src/app/store/app-initial-state";
import { clearBannerDetail, loadBannerDetail, loadBannerDetailFail, loadBannerDetailSuccess, saveBannerDetail, saveBannerDetailFail, saveBannerDetailSuccess } from "./banner-detail.actions";
import { bannerDetailReducer } from "./banner-detail.reducers";
import { BannerDetailState } from "./banner-detail.state";

fdescribe('Banner detail store', () => {
    
    it('loadBannerDetail', () => {
        const initialState: BannerDetailState = {
            ...AppInitialState.bannerDetail,
            banner: {} as any,
            error: {},
            isLoaded: true,
            isLoading: false
        };

        const id = "anyId";
        const state = bannerDetailReducer(initialState, loadBannerDetail({id}));

        expect(state).toEqual({
            ...AppInitialState.bannerDetail,
            banner: undefined,
            error: null,
            isLoaded: false,
            isLoading: true
        });
    });
    
    it('loadBannerDetailSuccess', () => {
        const initialState: BannerDetailState = {
            ...AppInitialState.bannerDetail,
            isLoading: true
        };

        const banner = {id: "anyId"} as any;
        const state = bannerDetailReducer(initialState, loadBannerDetailSuccess({banner}));

        expect(state).toEqual({
            ...AppInitialState.bannerDetail,
            banner,
            isLoaded: true,
            isLoading: false
        });
    });
    
    it('loadBannerDetailFail', () => {
        const initialState: BannerDetailState = {
            ...AppInitialState.bannerDetail,
            isLoading: true
        };

        const error = {error: "error"} as any;
        const state = bannerDetailReducer(initialState, loadBannerDetailFail({error}));

        expect(state).toEqual({
            ...AppInitialState.bannerDetail,
            error,
            isLoaded: false,
            isLoading: false
        });
    });
    
    it('saveBannerDetail', () => {
        const initialState: BannerDetailState = {
            ...AppInitialState.bannerDetail,
            error: {},
            isSaved: true,
            isSaving: false
        };

        const banner = {id: "anyId"} as any;
        const state = bannerDetailReducer(initialState, saveBannerDetail({banner}));

        expect(state).toEqual({
            ...AppInitialState.bannerDetail,
            error: null,
            isSaved: false,
            isSaving: true
        });
    });
    
    it('saveBannerDetailSuccess', () => {
        const initialState: BannerDetailState = {
            ...AppInitialState.bannerDetail,
            isSaving: true
        };

        const state = bannerDetailReducer(initialState, saveBannerDetailSuccess());

        expect(state).toEqual({
            ...AppInitialState.bannerDetail,
            isSaved: true,
            isSaving: false
        });
    });
    
    it('saveBannerDetailFail', () => {
        const initialState: BannerDetailState = {
            ...AppInitialState.bannerDetail,
            isSaving: true
        };

        const error = {error: "error"};
        const state = bannerDetailReducer(initialState, saveBannerDetailFail({error}));

        expect(state).toEqual({
            ...AppInitialState.bannerDetail,
            error,
            isSaved: false,
            isSaving: false
        });
    });
    
    it('clearBannerDetail', () => {
        const initialState: BannerDetailState = {
            ...AppInitialState.bannerDetail,
            error: {},
            banner: {} as any,
            isLoaded: true,
            isLoading: true,
            isSaved: true,
            isSaving: true
        };

        const state = bannerDetailReducer(initialState, clearBannerDetail());

        expect(state).toEqual({
            ...AppInitialState.bannerDetail
        });
    });
  
});