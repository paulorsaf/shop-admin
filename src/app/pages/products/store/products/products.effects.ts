import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { of, withLatestFrom } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Product } from "src/app/model/product/product";
import { ProductService } from "src/app/services/product/product.service";
import { AppState } from "src/app/store/app-state";
import { changeVisibilitySuccess } from "../../product-detail/store/products/product-detail.actions";
import { loadProducts, loadProductsFail, loadMoreProducts, loadProductsSuccess, removeProduct, removeProductFail, removeProductSuccess, updateProductOnList, updateProductOnListFail, updateProductOnListSuccess, filterProducts, uploadProducts, uploadProductsSuccess, uploadProductsFail } from "./products.actions";
import { ProductsState } from "./products.state";

@Injectable()
export class ProductsEffects {

    constructor(
        private actions$: Actions,
        private productService: ProductService,
        private store: Store<AppState>
    ){}

    loadEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                filterProducts,
                loadProducts,
                loadMoreProducts
            ),
            withLatestFrom(this.store.select(store => store.products)),
            switchMap(([, state]: [action: any, state: ProductsState]) => {
                return this.productService.find({
                    page: state.page,
                    internalId: state.filter?.internalId || "",
                    categoryId: state.filter?.categoryId || ""
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

    uploadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(uploadProducts),
            switchMap(({file}) =>
                this.productService.uploadProducts(file).pipe(
                    map(() => uploadProductsSuccess()),
                    catchError(error => of(uploadProductsFail({error})))
                )
            )
        )
    )

    uploadProductsSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(uploadProductsSuccess),
            switchMap(() => of(loadProducts()))
        )
    )

    getStore(){
        return withLatestFrom(this.store);
    }

}