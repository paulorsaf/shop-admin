import { createAction, props } from "@ngrx/store";
import { Client } from "src/app/model/user/client";

export const loadClients = createAction('[Clients] load clients');
export const loadClientsSuccess = createAction('[Clients] load clients success', props<{clients: Client[]}>());
export const loadClientsFail = createAction('[Clients] load clients fail', props<{error: any}>());