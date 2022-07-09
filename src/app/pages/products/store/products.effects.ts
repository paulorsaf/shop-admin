import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProductService } from "src/app/services/product/product.service";
import { load, loadFail, loadSuccess } from "./products.actions";

@Injectable()
export class ProductsEffects {

    constructor(
        private productService: ProductService,
        private actions$: Actions
    ){
    }

    loadEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(load),
            switchMap(() =>
                this.productService.find().pipe(
                    map(products => loadSuccess({products})),
                    catchError(error => of(loadFail({error})))
                )
            )
        )
    )

}