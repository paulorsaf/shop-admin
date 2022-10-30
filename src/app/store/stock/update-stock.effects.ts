import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { StockService } from "src/app/services/stock/stock.service";
import { updateStock, updateStockFail, updateStockSuccess } from "./update-stock.actions";

@Injectable()
export class UpdateStockEffects {

    constructor(
        private stockService: StockService,
        private actions$: Actions
    ){
    }

    updateStockEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateStock),
            switchMap(() =>
                this.stockService.updateStock().pipe(
                    map(() => updateStockSuccess()),
                    catchError(error => of(updateStockFail({error})))
                )
            )
        )
    )

}