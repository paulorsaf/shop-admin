import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DailySummaryPurchaseService } from "src/app/services/daily-summary-purchase/daily-summary-purchase.service";
import { loadDailyPurchaseSummaries, loadDailyPurchaseSummariesFail, loadDailyPurchaseSummariesSuccess } from "./daily-purchase-summaries.actions";

@Injectable()
export class DailyPurchaseSummariesEffects {

    constructor(
        private dailySummaryPurchaseService: DailySummaryPurchaseService,
        private actions$: Actions
    ){
    }

    loadDailyPurchaseSummariesEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadDailyPurchaseSummaries),
            switchMap((params: {from: string, until: string}) =>
                this.dailySummaryPurchaseService.find(params.from, params.until).pipe(
                    map(summaries => loadDailyPurchaseSummariesSuccess({summaries})),
                    catchError(error => of(loadDailyPurchaseSummariesFail({error})))
                )
            )
        )
    )

}