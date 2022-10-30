import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { UserEffects } from './user.effects';
import { EffectsModule } from "@ngrx/effects";
import { provideMockStore } from "@ngrx/store/testing";
import { AuthService } from "src/app/services/auth/auth.service";
import { AuthServiceMock } from "src/mock/auth-service.mock";
import { loadUserCompany, loadUserCompanyFail, loadUserCompanySuccess, logout, logoutSuccess, verfiyUserIsLogged, verfiyUserIsLoggedFail, verfiyUserIsLoggedSuccess } from "./user.actions";

describe('UserEffects', () => {

    let actions$ = new Observable<Action>();
    let effects: UserEffects;
    let authService: AuthServiceMock;

    const error = {error: "error"};

    beforeEach(() => {
        authService = new AuthServiceMock();

        TestBed.configureTestingModule({
            imports: [
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([UserEffects])
            ],
            providers: [
                UserEffects,
                provideMockStore({}),
                provideMockActions(() => actions$)
            ],
        })
        .overrideProvider(AuthService, {useValue: authService});

        effects = TestBed.get(UserEffects);
        spyOn(effects, 'reloadApp');
    })

    describe("Given verify user is logged", () => {

        beforeEach(() => {
            actions$ = of(verfiyUserIsLogged());
        })

        it('when success, then return verify user is logged success', (done) => {
            const user = {id: '1'} as any;
            authService._response = of(user);
    
            effects.verfiyUserIsLoggedEffect$.subscribe(response => {
                expect(response).toEqual(verfiyUserIsLoggedSuccess({user}));
                done();
            })
        })
    
        it('when fail, then return verify user is logged fail', (done) => {
            authService._response = throwError(error);
    
            effects.verfiyUserIsLoggedEffect$.subscribe(response => {
                expect(response).toEqual(verfiyUserIsLoggedFail());
                done();
            })
        })

    })

    describe("Given logout", () => {

        beforeEach(() => {
            actions$ = of(logout());
        })

        it('when success, then return logout success', (done) => {
            authService._response = of({});
    
            effects.logoutEffect$.subscribe(response => {
                expect(response).toEqual(logoutSuccess());
                done();
            })
        })

    })

    describe("Given load user company", () => {

        beforeEach(() => {
            actions$ = of(loadUserCompany());
        })

        it('when success, then return load user company success', (done) => {
            const company = {id: "anyCompanyId"} as any;
            authService._response = of(company);
    
            effects.loadUserCompanyEffect$.subscribe(response => {
                expect(response).toEqual(loadUserCompanySuccess({company}));
                done();
            })
        })

        it('when success, then return load user company success', (done) => {
            authService._response = throwError(error);
    
            effects.loadUserCompanyEffect$.subscribe(response => {
                expect(response).toEqual(loadUserCompanyFail({error}));
                done();
            })
        })

    })

});