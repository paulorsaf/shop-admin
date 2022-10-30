import { createAction, props } from "@ngrx/store";

export const updateStock = createAction('[Stock] update');
export const updateStockSuccess = createAction('[Stock] update success');
export const updateStockFail = createAction('[Stock] update fail', props<{error: any}>());