import { createAction, props } from "@ngrx/store";
import { PurchaseSummary } from "src/app/model/purchase/purchase-summary";

export const loadPurchases = createAction('[Purchases] load purchases');
export const loadPurchasesSuccess = createAction('[Purchases] load purchases success', props<{purchases: PurchaseSummary[]}>());
export const loadPurchasesFail = createAction('[Purchases] load purchases fail', props<{error: any}>());

export const printPurchase = createAction('[Purchases] print purchase', props<{id: string}>());
export const printPurchaseSuccess = createAction('[Purchases] print purchase success');