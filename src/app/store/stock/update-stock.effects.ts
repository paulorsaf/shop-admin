import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { StockService } from "src/app/services/stock/stock.service";
import { updateStock, updateStockFail, updateStockSuccess } from "./update-stock.actions";
import { loadProducts } from "src/app/pages/products/store/products/products.actions";

@Injectable()
export class UpdateStockEffects {

    constructor(
        private actions$: Actions,
        private stockService: StockService
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

    updateStockEffectSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateStockSuccess),
            filter(() => this.isProductsPage()),
            switchMap(() => of(loadProducts()))
        )
    )

    isProductsPage() {
        return window.location.href.endsWith("/products");
    }

}