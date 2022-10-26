import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from "src/app/services/auth/auth.service";
import { loadUserCompany, loadUserCompanyFail, loadUserCompanySuccess, logout, logoutSuccess, verfiyUserIsLogged, verfiyUserIsLoggedFail, verfiyUserIsLoggedSuccess } from "./user.actions";

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService
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

    logoutEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logout),
            switchMap(() =>
                this.authService.logout().pipe(
                    map(() => logoutSuccess())
                )
            )
        )
    )

    logoutSuccessEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logoutSuccess),
            tap(() => this.reloadApp())
        ), {
            dispatch: false
        }
    )

    loadUserCompanyEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUserCompany),
            switchMap(() =>
                this.authService.findCompanyByUser().pipe(
                    map(company => loadUserCompanySuccess({company})),
                    catchError(error => of(loadUserCompanyFail({error})))
                )
            )
        )
    )

    reloadApp() {
        window.location.pathname = ''
    }

}