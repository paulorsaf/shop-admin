import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Cupom } from "src/app/model/cupom/cupom";
import { CupomService } from "src/app/services/cupom/cupoms.service";
import { loadCupoms, loadCupomsFail, loadCupomsSuccess, saveCupom, saveCupomFail, saveCupomSuccess } from "./cupoms.actions";

@Injectable()
export class CupomsEffects {

    constructor(
        private cupomService: CupomService,
        private actions$: Actions
    ){
    }

    loadCupomsEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCupoms),
            switchMap(() =>
                this.cupomService.find().pipe(
                    map(cupoms => loadCupomsSuccess({cupoms})),
                    catchError(error => of(loadCupomsFail({error})))
                )
            )
        )
    )

    saveCupomEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveCupom),
            switchMap((params: {cupom: Cupom}) =>
                this.cupomService.save(params.cupom).pipe(
                    map(() => saveCupomSuccess()),
                    catchError(error => of(saveCupomFail({error})))
                )
            )
        )
    )

    saveCupomSuccessEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveCupomSuccess),
            switchMap(() => of(loadCupoms()))
        )
    )

}