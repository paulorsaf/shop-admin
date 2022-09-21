import { AppInitialState } from "src/app/store/app-initial-state";
import { loadClients, loadClientsFail, loadClientsSuccess } from "./clients.actions";
import { clientsReducer } from "./clients.reducers";
import { ClientsState } from "./clients.state";

describe('Users store', () => {
    
    it('loadClients', () => {
        const initialState: ClientsState = {
            ...AppInitialState.clients,
            error: {},
            isLoaded: true,
            isLoading: false,
            clients: [{}] as any
        };

        const state = clientsReducer(initialState, loadClients());

        expect(state).toEqual({
            ...AppInitialState.clients,
            error: null,
            isLoaded: false,
            isLoading: true,
            clients: []
        });
    });
    
    it('loadClientsSuccess', () => {
        const initialState: ClientsState = {
            ...AppInitialState.clients,
            isLoaded: false,
            isLoading: true
        };

        const clients = [{id: 1}] as any;
        const state = clientsReducer(initialState, loadClientsSuccess({clients}));

        expect(state).toEqual({
            ...AppInitialState.clients,
            isLoaded: true,
            isLoading: false,
            clients
        });
    });
    
    it('loadClientsFail', () => {
        const initialState: ClientsState = {
            ...AppInitialState.clients,
            isLoaded: false,
            isLoading: true
        };

        const error = {error: "error"};
        const state = clientsReducer(initialState, loadClientsFail({error}));

        expect(state).toEqual({
            ...AppInitialState.clients,
            error,
            isLoaded: false,
            isLoading: false
        });
    });
  
});