import { createAction, props } from "@ngrx/store";
import { Cupom } from "src/app/model/cupom/cupom";

export const loadCupoms = createAction('[Cupoms] load cupoms');
export const loadCupomsSuccess = createAction('[Cupoms] load cupoms success', props<{cupoms: Cupom[]}>());
export const loadCupomsFail = createAction('[Cupoms] load cupoms fail', props<{error: any}>());

export const saveCupom = createAction('[Cupoms] saveCupom', props<{cupom: Cupom}>());
export const saveCupomSuccess = createAction('[Cupoms] saveCupom success');
export const saveCupomFail = createAction('[Cupoms] saveCupom fail', props<{error: any}>());