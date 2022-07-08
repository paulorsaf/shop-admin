import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { LoginEffects } from './login.effects';
import { EffectsModule } from "@ngrx/effects";
import { provideMockStore } from "@ngrx/store/testing";
import { AuthService } from "src/app/services/auth/auth.service";
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { User } from "src/app/model/user/user";
import { AuthServiceMock } from "src/mock/auth-service.mock";

describe('LoginEffects', () => {

    let actions$ = new Observable<Action>();
    let effects: LoginEffects;
    let authService: AuthServiceMock;

    const error = {error: "error"};

    beforeEach(() => {
        authService = new AuthServiceMock();

        TestBed.configureTestingModule({
            imports: [
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([LoginEffects])
            ],
            providers: [
                LoginEffects,
                provideMockStore({}),
                provideMockActions(() => actions$)
            ],
        })
        .overrideProvider(AuthService, {useValue: authService});

        effects = TestBed.get(LoginEffects);
    })

    describe("Given login", () => {

        beforeEach(() => {
            actions$ = of(login({email: "any@email.com", password: "anyPassword"}));
        })

        it('when success, then return login success', (done) => {
            const user = {id: '1'} as User;
            authService._response = of(user);
    
            effects.loginEffect$.subscribe(response => {
                expect(response).toEqual(loginSuccess({user}));
                done();
            })
        })
    
        it('when fail, then return login fail', (done) => {
            authService._response = throwError(error);
    
            effects.loginEffect$.subscribe(response => {
                expect(response).toEqual(loginFail({error}));
                done();
            })
        })

    })

    describe("Given recover password", () => {

        beforeEach(() => {
            actions$ = of(recoverPassword({email: "any@email.com"}));
        })

        it('when success, then return recover password success', (done) => {
            authService._response = of({});
    
            effects.recoverPasswordEffect$.subscribe(response => {
                expect(response).toEqual(recoverPasswordSuccess());
                done();
            })
        })
    
        it('when fail, then return recover password fail', (done) => {
            authService._response = throwError(error);
    
            effects.recoverPasswordEffect$.subscribe(response => {
                expect(response).toEqual(recoverPasswordFail({error}));
                done();
            })
        })

    })

});