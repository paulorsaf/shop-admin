import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { of, withLatestFrom } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Product } from "src/app/model/product/product";
import { ProductService } from "src/app/services/product/product.service";
import { AppState } from "src/app/store/app-state";
import { changeVisibilitySuccess } from "../../product-detail/store/products/product-detail.actions";
import { load, loadFail, loadMoreProducts, loadSuccess, remove, removeFail, removeSuccess, updateProductOnList, updateProductOnListFail, updateProductOnListSuccess } from "./products.actions";
import { ProductsState } from "./products.state";

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
            withLatestFrom(this.store.select(store => store.products)),
            switchMap(([action, state]: [action: any, state: ProductsState]) => {
                return this.productService.find({
                    page: state.page,
                    internalId: action.filter?.internalId || ""
                }).pipe(
                    map(products => loadSuccess({products})),
                    catchError(error => of(loadFail({error})))
                )
            })
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

    changeVisibilitySuccessEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(changeVisibilitySuccess),
            switchMap((params: {id: string}) => of(updateProductOnList({id: params.id})))
        )
    )

    updateProductOnList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateProductOnList),
            switchMap((params: {id: string}) =>
                this.productService.findById(params.id).pipe(
                    map(product => updateProductOnListSuccess({product})),
                    catchError(error => of(updateProductOnListFail({error})))
                )
            )
        )
    )

    getStore(){
        return withLatestFrom(this.store);
    }

}