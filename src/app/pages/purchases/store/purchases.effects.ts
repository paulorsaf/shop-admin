import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PurchaseSummary } from "src/app/model/purchase/purchase-summary";
import { PurchaseService } from "src/app/services/purchase/purchase.service";
import { loadPurchases, loadPurchasesFail, loadPurchasesSuccess, printPurchase, printPurchaseSuccess } from "./purchases.actions";

@Injectable()
export class PurchasesEffects {

    constructor(
        private purchaseService: PurchaseService,
        private actions$: Actions
    ){
    }

    loadPurchasesEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadPurchases),
            switchMap(() =>
                this.purchaseService.find().pipe(
                    map(purchases => loadPurchasesSuccess({purchases})),
                    catchError(error => of(loadPurchasesFail({error})))
                )
            )
        )
    )

    printPurchasesEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(printPurchase),
            switchMap((params: {id: string}) =>
                this.purchaseService.print(params.id).pipe(
                    map(() => printPurchaseSuccess()),
                    catchError(() => of(printPurchaseSuccess()))
                )
            )
        )
    )

}