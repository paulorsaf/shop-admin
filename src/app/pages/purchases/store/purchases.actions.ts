import { createAction, props } from "@ngrx/store";
import { PurchaseSummary } from "src/app/model/purchase/purchase-summary";

export const loadPurchases = createAction('[Product] load purchases');
export const loadPurchasesSuccess = createAction('[Product] load purchases success', props<{purchases: PurchaseSummary[]}>());
export const loadPurchasesFail = createAction('[Product] load purchases fail', props<{error: any}>());