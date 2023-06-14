import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { of, withLatestFrom } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Product } from "src/app/model/product/product";
import { ProductService } from "src/app/services/product/product.service";
import { AppState } from "src/app/store/app-state";
import { changeVisibilitySuccess } from "../../product-detail/store/products/product-detail.actions";
import { loadProducts, loadProductsFail, loadMoreProducts, loadProductsSuccess, removeProduct, removeProductFail, removeProductSuccess, updateProductOnList, updateProductOnListFail, updateProductOnListSuccess } from "./products.actions";
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
                loadProducts,
                loadMoreProducts
            ),
            withLatestFrom(this.store.select(store => store.products)),
            switchMap(([action, state]: [action: any, state: ProductsState]) => {
                return this.productService.find({
                    page: state.page,
                    internalId: action.filter?.internalId || ""
                }).pipe(
                    map(products => loadProductsSuccess({products})),
                    catchError(error => of(loadProductsFail({error})))
                )
            })
        )
    )

    removeEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeProduct),
            switchMap((params: {product: Product}) =>
                this.productService.remove(params.product).pipe(
                    map(() => removeProductSuccess()),
                    catchError(error => of(removeProductFail({error})))
                )
            )
        )
    )

    removeSuccessEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeProductSuccess),
            switchMap(() => of(loadProducts()))
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