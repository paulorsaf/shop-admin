import { createAction, props } from "@ngrx/store";
import { DailyPurchaseSummary } from "src/app/model/purchase-summary/daily-purchase-summary";

export const loadDailyPurchaseSummaries =
    createAction('[Daily purchase summaries] load', props<{from: string, until: string}>());
export const loadDailyPurchaseSummariesSuccess =
    createAction('[Daily purchase summaries] load success', props<{summaries: DailyPurchaseSummary[]}>());
export const loadDailyPurchaseSummariesFail =
    createAction('[Daily purchase summaries] load fail', props<{error: any}>());