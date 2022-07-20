import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { iif, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Product } from "src/app/model/product/product";
import { ProductService } from "src/app/services/product/product.service";
import { StockService } from "src/app/services/stock/stock.service";
import { AppState } from "src/app/store/app-state";
import { loadDetail, loadDetailFail, loadDetailSuccess, loadStock, loadStockFail, loadStockSuccess, removeStock, removeStockFail, removeStockSuccess, saveDetail, saveDetailFail, saveDetailSuccess, saveStock, saveStockFail, saveStockSuccess, uploadImage, uploadImageFail, uploadImageSuccess } from "./product-detail.actions";

@Injectable()
export class ProductDetailEffects {

    constructor(
        private productService: ProductService,
        private stockService: StockService,
        private actions$: Actions,
        private store: Store<AppState>
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

    loadStockEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadStock),
            switchMap((params: {id: string}) =>
                this.stockService.findByProductId(params.id).pipe(
                    map(stock => loadStockSuccess({stock})),
                    catchError(error => of(loadStockFail({error})))
                )
            )
        )
    )

    saveStockEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveStock),
            this.getStore(),
            switchMap(([action, storeState]: [action: any, storeState: AppState]) => 
                iif(
                    () => !!storeState.productDetail.stock?.id,
                    this.stockService.addStock(
                        storeState.productDetail.product!.id, action.stock
                    ).pipe(
                        map(() => saveStockSuccess()),
                        catchError(error => of(saveStockFail({error})))
                    ),
                    this.stockService.createStock(
                        storeState.productDetail.product!.id, action.stock
                    ).pipe(
                        map(() => saveStockSuccess()),
                        catchError(error => of(saveStockFail({error})))
                    )
                )
            )
        )
    )

    saveStockSuccessEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveStockSuccess),
            this.getStore(),
            switchMap(([action, storeState]: [action: any, storeState: AppState]) =>
                of(loadStock({id: storeState.productDetail.product!.id})))
        )
    )

    uploadImageEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(uploadImage),
            this.getStore(),
            switchMap(([action, storeState]: [action: any, storeState: AppState]) =>
                this.productService.uploadImage(
                    storeState.productDetail.product!.id, action.image
                ).pipe(
                    map(() => uploadImageSuccess()),
                    catchError(error => of(uploadImageFail({error})))
                )
            )
        )
    )

    uploadImageSuccessEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(uploadImageSuccess),
            this.getStore(),
            switchMap(([action, storeState]: [action: any, storeState: AppState]) =>
                of(loadDetail({id: storeState.productDetail.product!.id}))
            )
        )
    )

    removeStockEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeStock),
            this.getStore(),
            switchMap(([action, storeState]: [action: any, storeState: AppState]) =>
                this.stockService.removeStockOption(
                    storeState.productDetail.product!.id,
                    storeState.productDetail.stock!.id,
                    action.stockOption.id
                ).pipe(
                    map(() => removeStockSuccess()),
                    catchError(error => of(removeStockFail({error})))
                )
            )
        )
    )

    removeStockSuccessEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeStockSuccess),
            this.getStore(),
            switchMap(([action, storeState]: [action: any, storeState: AppState]) =>
                of(loadStock({id: storeState.productDetail.product!.id}))
            )
        )
    )

    getStore(){
        return withLatestFrom(this.store);
    }

}