import { createAction, props } from "@ngrx/store";
import { Purchase } from "src/app/model/purchase/purchase";

export const loadPurchases = createAction('[Product] load purchases');
export const loadPurchasesSuccess = createAction('[Product] load purchases success', props<{purchases: Purchase[]}>());
export const loadPurchasesFail = createAction('[Product] load purchases fail', props<{error: any}>());