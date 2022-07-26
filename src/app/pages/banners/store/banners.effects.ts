import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Banner } from "src/app/model/banner/banner";
import { BannersService } from "src/app/services/banners/banners.service";
import { loadBanners, loadBannersFail, loadBannersSuccess, removeBanner, removeBannerFail, removeBannerSuccess } from "./banners.actions";

@Injectable()
export class BannersEffects {

    constructor(
        private bannersService: BannersService,
        private actions$: Actions
    ){
    }

    loadBannersEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadBanners),
            switchMap(() =>
                this.bannersService.find().pipe(
                    map(banners => loadBannersSuccess({banners})),
                    catchError(error => of(loadBannersFail({error})))
                )
            )
        )
    )

    removeBannerEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeBanner),
            switchMap((params: {banner: Banner}) =>
                this.bannersService.remove(params.banner).pipe(
                    map(() => removeBannerSuccess()),
                    catchError(error => of(removeBannerFail({error})))
                )
            )
        )
    )

    removeBannerSuccessEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeBannerSuccess),
            switchMap(() => of(loadBanners()))
        )
    )

}