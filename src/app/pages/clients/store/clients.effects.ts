import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ClientService } from "src/app/services/client/client.service";
import { loadClients, loadClientsFail, loadClientsSuccess } from "./clients.actions";

@Injectable()
export class ClientEffects {

    constructor(
        private clientService: ClientService,
        private actions$: Actions
    ){
    }

    loadClientsEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadClients),
            switchMap(() =>
                this.clientService.find().pipe(
                    map(clients => loadClientsSuccess({clients})),
                    catchError(error => of(loadClientsFail({error})))
                )
            )
        )
    )

}