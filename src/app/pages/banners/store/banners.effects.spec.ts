import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { BannersEffects } from './banners.effects';
import { EffectsModule } from "@ngrx/effects";
import { provideMockStore } from "@ngrx/store/testing";
import { loadBanners, loadBannersFail, loadBannersSuccess, removeBanner, removeBannerFail, removeBannerSuccess } from "./banners.actions";
import { BannersServiceMock } from "src/mock/banners-service.mock";
import { BannersService } from "src/app/services/banners/banners.service";

fdescribe('BannersEffects', () => {

    let actions$ = new Observable<Action>();
    let effects: BannersEffects;
    let bannersService: BannersServiceMock;

    const banners = [{id: '1'}] as any;
    const error = {error: "error"};

    beforeEach(() => {
        bannersService = new BannersServiceMock();

        TestBed.configureTestingModule({
            imports: [
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([BannersEffects])
            ],
            providers: [
                BannersEffects,
                provideMockStore({}),
                provideMockActions(() => actions$)
            ],
        })
        .overrideProvider(BannersService, {useValue: bannersService});

        effects = TestBed.get(BannersEffects);
    })

    describe("Given load banners", () => {

        beforeEach(() => {
            actions$ = of(loadBanners());
        })

        it('when success, then return load success', (done) => {
            bannersService._response = of(banners);
    
            effects.loadBannersEffect$.subscribe(response => {
                expect(response).toEqual(loadBannersSuccess({banners}));
                done();
            })
        })
    
        it('when fail, then return load fail', (done) => {
            bannersService._response = throwError(error);
    
            effects.loadBannersEffect$.subscribe(response => {
                expect(response).toEqual(loadBannersFail({error}));
                done();
            })
        })

    })

    describe("Given remove banner", () => {

        beforeEach(() => {
            actions$ = of(removeBanner({banner: {id: "anyId"} as any}));
        })

        it('when success, then return remove banner success', (done) => {
            bannersService._response = of(banners);
    
            effects.removeBannerEffect$.subscribe(response => {
                expect(response).toEqual(removeBannerSuccess());
                done();
            })
        })
    
        it('when fail, then return remove banner fail', (done) => {
            bannersService._response = throwError(error);
    
            effects.removeBannerEffect$.subscribe(response => {
                expect(response).toEqual(removeBannerFail({error}));
                done();
            })
        })

    })

    describe("Given banner removed", () => {

        beforeEach(() => {
            actions$ = of(removeBannerSuccess());
        })

        it('then return load banners', (done) => {
            effects.removeBannerSuccessEffect$.subscribe(response => {
                expect(response).toEqual(loadBanners());
                done();
            })
        })

    })

});