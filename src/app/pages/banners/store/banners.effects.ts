import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BannersService } from "src/app/services/banners/banners.service";
import { loadBanners, loadBannersFail, loadBannersSuccess } from "./banners.actions";

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

}