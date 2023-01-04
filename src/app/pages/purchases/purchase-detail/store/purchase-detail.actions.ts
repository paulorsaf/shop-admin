import { createAction, props } from "@ngrx/store";
import { Purchase } from "src/app/model/purchase/purchase";

export const loadPurchaseDetail = createAction('[Purchase detail] load', props<{id: string}>());
export const loadPurchaseDetailSuccess = createAction('[Purchase detail] load success', props<{purchase: Purchase}>());
export const loadPurchaseDetailFail = createAction('[Purchase detail] load fail', props<{error: any}>());

export const updatePurchaseStatus =
    createAction('[Purchase detail] update status', props<{status: string, reason?: string}>());
export const updatePurchaseStatusSuccess = createAction('[Purchase detail] update status success');
export const updatePurchaseStatusFail = createAction('[Purchase detail] update status fail', props<{error: any}>());

export const sendPurchaseToSystem = createAction('[Purchase detail] send to system');
export const sendPurchaseToSystemSuccess = createAction('[Purchase detail] send to system success');
export const sendPurchaseToSystemFail = createAction('[Purchase detail] send to system fail', props<{error: any}>());

export const editPurchaseProduct = createAction('[Purchase detail] edit product', props<{productId: string, stockId: string, value: number}>());
export const editPurchaseProductSuccess = createAction('[Purchase detail] edit product success');
export const editPurchaseProductFail = createAction('[Purchase detail] edit product fail', props<{error: any}>());

export const cancelPurchaseProduct = createAction('[Purchase detail] cancel product', props<{id: string, stockId: string}>());
export const cancelPurchaseProductSuccess = createAction('[Purchase detail] cancel product success');
export const cancelPurchaseProductFail = createAction('[Purchase detail] cancel product fail', props<{error: any}>());