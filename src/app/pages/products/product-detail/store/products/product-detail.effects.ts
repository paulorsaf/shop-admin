import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { iif, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Product } from "src/app/model/product/product";
import { ProductService } from "src/app/services/product/product.service";
import { clear, loadDetail, loadDetailFail, loadDetailSuccess, saveDetail, saveDetailFail, saveDetailSuccess } from "./product-detail.actions";

@Injectable()
export class ProductDetailEffects {

    constructor(
        private productService: ProductService,
        private actions$: Actions
    ){
    }

    loadDetailEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadDetail),
            switchMap((params: {id: string}) =>
                this.productService.findById(params.id).pipe(
                    map(product => loadDetailSuccess({product})),
                    catchError(error => of(loadDetailFail({error})))
                )
            )
        )
    )

    saveDetailEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveDetail),
            switchMap((params: {product: Product}) =>
                iif(
                    () => !!params.product.id,
                    this.productService.update(params.product).pipe(
                        map(() => saveDetailSuccess()),
                        catchError(error => of(saveDetailFail({error})))
                    ),
                    this.productService.save(params.product).pipe(
                        map(() => saveDetailSuccess()),
                        catchError(error => of(saveDetailFail({error})))
                    )
                )
            )
        )
    )

    saveDetailSuccessEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveDetailSuccess),
            switchMap(() => of(clear()))
        )
    )

}