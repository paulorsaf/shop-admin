import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { of, withLatestFrom } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Product } from "src/app/model/product/product";
import { ProductService } from "src/app/services/product/product.service";
import { AppState } from "src/app/store/app-state";
import { load, loadFail, loadMoreProducts, loadSuccess, remove, removeFail, removeSuccess } from "./products.actions";

@Injectable()
export class ProductsEffects {

    constructor(
        private actions$: Actions,
        private productService: ProductService,
        private store: Store<AppState>
    ){
    }

    loadEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                load,
                loadMoreProducts
            ),
            this.getStore(),
            switchMap(([action, storeState]: [action: any, storeState: AppState]) => 
                this.productService.find({
                    page: storeState.products.page
                }).pipe(
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

    getStore(){
        return withLatestFrom(this.store);
    }

}