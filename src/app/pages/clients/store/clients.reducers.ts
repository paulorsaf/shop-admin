import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from 'src/app/store/app-initial-state';
import { loadClients, loadClientsFail, loadClientsSuccess } from './clients.actions';
import { ClientsState } from './clients.state';

const initialState: ClientsState = AppInitialState.clients;

const _clientsReducer = createReducer(initialState,
    on(loadClients, (state) => {
        return {
            ...state,
            error: null,
            isLoaded: false,
            isLoading: true,
            clients: []
        };
    }),
    on(loadClientsSuccess, (state, action) => {
        return {
            ...state,
            isLoaded: true,
            isLoading: false,
            clients: action.clients
        };
    }),
    on(loadClientsFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isLoaded: false,
            isLoading: false
        };
    })
);
 
export function clientsReducer(state: ClientsState, action: any) {
  return _clientsReducer(state, action);
}