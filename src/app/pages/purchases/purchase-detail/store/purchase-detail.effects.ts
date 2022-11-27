import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { of, withLatestFrom } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PurchaseService } from "src/app/services/purchase/purchase.service";
import { AppState } from "src/app/store/app-state";
import { editPurchaseProduct, editPurchaseProductFail, editPurchaseProductSuccess, loadPurchaseDetail, loadPurchaseDetailFail, loadPurchaseDetailSuccess, sendPurchaseToSystem, sendPurchaseToSystemFail, sendPurchaseToSystemSuccess, updatePurchaseStatus, updatePurchaseStatusFail, updatePurchaseStatusSuccess } from "./purchase-detail.actions";

@Injectable()
export class PurchaseDetailEffects {

    constructor(
        private actions$: Actions,
        private purchaseService: PurchaseService,
        private store: Store<AppState>
    ){
    }

    loadDetailEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadPurchaseDetail),
            switchMap((params: {id: string}) =>
                this.purchaseService.findById(params.id).pipe(
                    map(purchase => loadPurchaseDetailSuccess({purchase})),
                    catchError(error => of(loadPurchaseDetailFail({error})))
                )
            )
        )
    )

    updatePurchaseStatusEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updatePurchaseStatus),
            this.getStore(),
            switchMap(([action, storeState]: [action: any, storeState: AppState]) =>
                this.purchaseService.updateStatus(
                    storeState.purchaseDetail.purchase?.id || "",
                    action.status,
                    action.reason
                ).pipe(
                    map(() => updatePurchaseStatusSuccess()),
                    catchError(error => of(updatePurchaseStatusFail({error})))
                )
            )
        )
    )

    updatePurchaseStatusSuccessEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updatePurchaseStatusSuccess),
            this.getStore(),
            switchMap(([action, storeState]: [action: any, storeState: AppState]) =>
                of(loadPurchaseDetail({id: storeState.purchaseDetail.purchase?.id || ""}))
            )
        )
    )

    sendToSystemEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sendPurchaseToSystem),
            this.getStore(),
            switchMap(([action, storeState]: [action: any, storeState: AppState]) =>
                this.purchaseService.sendToSystem(
                    storeState.purchaseDetail.purchase!.id
                ).pipe(
                    map(() => sendPurchaseToSystemSuccess()),
                    catchError(error => of(sendPurchaseToSystemFail({error})))
                )
            )
        )
    )

    sendToSystemSuccessEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sendPurchaseToSystemSuccess),
            this.getStore(),
            switchMap(([action, storeState]: [action: any, storeState: AppState]) =>
                of(loadPurchaseDetail({id: storeState.purchaseDetail.purchase!.id}))
            )
        )
    )

    editPurchaseProductEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(editPurchaseProduct),
            this.getStore(),
            switchMap(([action, storeState]: [action: any, storeState: AppState]) =>
                this.purchaseService.editPurchaseProduct({
                    productId: action.productId,
                    purchaseId: storeState.purchaseDetail.purchase!.id,
                    stockId: action.stockId,
                    value: action.value
                }).pipe(
                    map(() => editPurchaseProductSuccess()),
                    catchError(error => of(editPurchaseProductFail({error})))
                )
            )
        )
    )

    editPurchaseProductSuccessEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(editPurchaseProductSuccess),
            this.getStore(),
            switchMap(([action, storeState]: [action: any, storeState: AppState]) =>
                of(loadPurchaseDetail({id: storeState.purchaseDetail.purchase!.id}))
            )
        )
    )

    getStore(){
        return withLatestFrom(this.store);
    }

}