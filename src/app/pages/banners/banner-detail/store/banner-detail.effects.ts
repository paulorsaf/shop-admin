import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { iif, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SaveBanner } from "src/app/model/banner/banner";
import { BannersService } from "src/app/services/banners/banners.service";
import { loadBannerDetail, loadBannerDetailFail, loadBannerDetailSuccess, saveBannerDetail, saveBannerDetailFail, saveBannerDetailSuccess } from "./banner-detail.actions";

@Injectable()
export class BannerDetailEffects {

    constructor(
        private bannersService: BannersService,
        private actions$: Actions
    ){
    }

    loadBannerDetailEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadBannerDetail),
            switchMap((params: {id: string}) =>
                this.bannersService.findById(params.id).pipe(
                    map(banner => loadBannerDetailSuccess({banner})),
                    catchError(error => of(loadBannerDetailFail({error})))
                )
            )
        )
    )

    saveBannerDetailEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveBannerDetail),
            switchMap((params: {banner: SaveBanner}) =>
                iif(
                    () => !!params.banner.id,
                    this.bannersService.update(params.banner).pipe(
                        map(() => saveBannerDetailSuccess()),
                        catchError(error => of(saveBannerDetailFail({error})))
                    ),
                    this.bannersService.save(params.banner).pipe(
                        map(() => saveBannerDetailSuccess()),
                        catchError(error => of(saveBannerDetailFail({error})))
                    )
                )
            )
        )
    )

}