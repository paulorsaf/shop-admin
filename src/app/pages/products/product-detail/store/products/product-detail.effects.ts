import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProductService } from "src/app/services/product/product.service";
import { loadDetail, loadDetailFail, loadDetailSuccess } from "./product-detail.actions";

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

}