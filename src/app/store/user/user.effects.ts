import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from "src/app/services/auth/auth.service";
import { verfiyUserIsLogged, verfiyUserIsLoggedFail, verfiyUserIsLoggedSuccess } from "./user.actions";

@Injectable()
export class UserEffects {

    constructor(
        private authService: AuthService,
        private actions$: Actions
    ){
    }

    verfiyUserIsLoggedEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(verfiyUserIsLogged),
            switchMap(() =>
                this.authService.findLoggedUser().pipe(
                    map(user => verfiyUserIsLoggedSuccess({user})),
                    catchError(() => of(verfiyUserIsLoggedFail()))
                )
            )
        )
    )

}