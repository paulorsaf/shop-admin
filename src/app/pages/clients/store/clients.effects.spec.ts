import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { ClientEffects } from './clients.effects';
import { EffectsModule } from "@ngrx/effects";
import { provideMockStore } from "@ngrx/store/testing";
import { loadClients, loadClientsFail, loadClientsSuccess } from "./clients.actions";
import { ClientServiceMock } from "src/mock/client-service.mock";
import { ClientService } from "src/app/services/client/client.service";

describe('ClientEffects', () => {

    let actions$ = new Observable<Action>();
    let effects: ClientEffects;
    let clientService: ClientServiceMock;

    const clients = [{id: '1'}] as any;
    const error = {error: "error"};

    beforeEach(() => {
        clientService = new ClientServiceMock();

        TestBed.configureTestingModule({
            imports: [
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([ClientEffects])
            ],
            providers: [
                ClientEffects,
                provideMockStore({}),
                provideMockActions(() => actions$)
            ],
        })
        .overrideProvider(ClientService, {useValue: clientService});

        effects = TestBed.get(ClientEffects);
    })

    describe("Given load purchases", () => {

        beforeEach(() => {
            actions$ = of(loadClients());
        })

        it('when success, then return load success', (done) => {
            clientService._response = of(clients);
    
            effects.loadClientsEffect$.subscribe(response => {
                expect(response).toEqual(loadClientsSuccess({clients}));
                done();
            })
        })
    
        it('when fail, then return load fail', (done) => {
            clientService._response = throwError(error);
    
            effects.loadClientsEffect$.subscribe(response => {
                expect(response).toEqual(loadClientsFail({error}));
                done();
            })
        })

    })

});