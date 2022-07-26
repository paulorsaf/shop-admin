import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { BannerDetailEffects } from './banner-detail.effects';
import { EffectsModule } from "@ngrx/effects";
import { provideMockStore } from "@ngrx/store/testing";
import { BannersServiceMock } from "src/mock/banners-service.mock";
import { BannersService } from "src/app/services/banners/banners.service";
import { loadBannerDetail, loadBannerDetailFail, loadBannerDetailSuccess, saveBannerDetail, saveBannerDetailFail, saveBannerDetailSuccess } from "./banner-detail.actions";
import { SaveBanner } from "src/app/model/banner/banner";

describe('BannerDetailEffects', () => {

    let actions$ = new Observable<Action>();
    let effects: BannerDetailEffects;
    let bannersService: BannersServiceMock;

    const banner = {id: "anyId"} as any;
    const error = {error: "error"};

    beforeEach(() => {
        bannersService = new BannersServiceMock();

        TestBed.configureTestingModule({
            imports: [
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([BannerDetailEffects])
            ],
            providers: [
                BannerDetailEffects,
                provideMockStore({}),
                provideMockActions(() => actions$)
            ],
        })
        .overrideProvider(BannersService, {useValue: bannersService});

        effects = TestBed.get(BannerDetailEffects);
    })

    describe("Given find banner detail by id", () => {

        beforeEach(() => {
            actions$ = of(loadBannerDetail({id: "anyId"}));
        })

        it('when success, then return save banner detail success', (done) => {
            bannersService._response = of(banner);
    
            effects.loadBannerDetailEffect$.subscribe(response => {
                expect(response).toEqual(loadBannerDetailSuccess({banner}));
                done();
            })
        })
    
        it('when fail, then return save banner detail fail', (done) => {
            bannersService._response = throwError(error);
    
            effects.loadBannerDetailEffect$.subscribe(response => {
                expect(response).toEqual(loadBannerDetailFail({error}));
                done();
            })
        })

    })

    describe("Given save banner detail", () => {

        let banner: SaveBanner;

        beforeEach(() => {
            banner = {productId: "any"} as any;
            actions$ = of(saveBannerDetail({banner}));
        })

        it('when new banner, then call save banner service', done => {
            effects.saveBannerDetailEffect$.subscribe(() => {
                expect(bannersService._hasSaved).toBeTruthy();
                done();
            })
        })

        it('when existing banner, then call update banner service', done => {
            banner = {id: "anyId", productId: "any"} as any;
            actions$ = of(saveBannerDetail({banner}));

            effects.saveBannerDetailEffect$.subscribe(() => {
                expect(bannersService._hasUpdated).toBeTruthy();
                done();
            })
        })

        it('when success, then return save banner detail success', (done) => {
            bannersService._response = of(null);
    
            effects.saveBannerDetailEffect$.subscribe(response => {
                expect(response).toEqual(saveBannerDetailSuccess());
                done();
            })
        })
    
        it('when fail, then return save banner detail fail', (done) => {
            bannersService._response = throwError(error);
    
            effects.saveBannerDetailEffect$.subscribe(response => {
                expect(response).toEqual(saveBannerDetailFail({error}));
                done();
            })
        })

    })

});