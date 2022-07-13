import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Product } from "src/app/model/product/product";
import { ProductService } from "src/app/services/product/product.service";
import { load, loadFail, loadSuccess, remove, removeFail, removeSuccess } from "./products.actions";

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

    removeEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(remove),
            switchMap((params: {product: Product}) =>
                this.productService.remove(params.product).pipe(
                    map(() => removeSuccess()),
                    catchError(error => of(removeFail({error})))
                )
            )
        )
    )

    removeSuccessEffect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(removeSuccess),
        switchMap(() => of(load()))
      )
    )

}