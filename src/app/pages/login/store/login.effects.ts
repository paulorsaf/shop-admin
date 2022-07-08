import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from "src/app/services/auth/auth.service";
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";

@Injectable()
export class LoginEffects {

    constructor(
        private authService: AuthService,
        private actions$: Actions
    ){
    }

    loginEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(login),
            switchMap((params: {email: string, password: string}) =>
                this.authService.login(params.email, params.password).pipe(
                    map(user => loginSuccess({user})),
                    catchError(error => of(loginFail({error})))
                )
            )
        )
    )

    recoverPasswordEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(recoverPassword),
            switchMap((params: {email: string}) =>
                this.authService.recoverPassword(params.email).pipe(
                    map(() => recoverPasswordSuccess()),
                    catchError(error => of(recoverPasswordFail({error})))
                )
            )
        )
    )

}