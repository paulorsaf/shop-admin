import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { UserEffects } from './user.effects';
import { EffectsModule } from "@ngrx/effects";
import { provideMockStore } from "@ngrx/store/testing";
import { AuthService } from "src/app/services/auth/auth.service";
import { User } from "src/app/model/user/user";
import { AuthServiceMock } from "src/mock/auth-service.mock";
import { verfiyUserIsLogged, verfiyUserIsLoggedFail, verfiyUserIsLoggedSuccess } from "./user.actions";

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

});