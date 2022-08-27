import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { of, withLatestFrom } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PurchaseService } from "src/app/services/purchase/purchase.service";
import { AppState } from "src/app/store/app-state";
import { loadPurchaseDetail, loadPurchaseDetailFail, loadPurchaseDetailSuccess, updatePurchaseStatus, updatePurchaseStatusFail, updatePurchaseStatusSuccess } from "./purchase-detail.actions";

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
                    action.status
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

    getStore(){
        return withLatestFrom(this.store);
    }

}