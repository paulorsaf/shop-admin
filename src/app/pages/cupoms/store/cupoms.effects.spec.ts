import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { CupomsEffects } from './cupoms.effects';
import { EffectsModule } from "@ngrx/effects";
import { provideMockStore } from "@ngrx/store/testing";
import { loadCupoms, loadCupomsFail, loadCupomsSuccess, saveCupom, saveCupomFail, saveCupomSuccess } from "./cupoms.actions";
import { CupomService } from "src/app/services/cupom/cupoms.service";

describe('CupomsEffects', () => {

    let actions$ = new Observable<Action>();
    let effects: CupomsEffects;
    let cupomService: CupomServiceMock;

    const cupom = {id: '1'} as any;
    const cupoms = [cupom];
    const error = {error: "error"};

    beforeEach(() => {
        cupomService = new CupomServiceMock();

        TestBed.configureTestingModule({
            imports: [
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([CupomsEffects])
            ],
            providers: [
                CupomsEffects,
                provideMockStore({}),
                provideMockActions(() => actions$)
            ],
        })
        .overrideProvider(CupomService, {useValue: cupomService});

        effects = TestBed.get(CupomsEffects);
    })

    describe("Given load cupoms", () => {

        beforeEach(() => {
            actions$ = of(loadCupoms());
        })

        it('when success, then return load success', (done) => {
            cupomService._response = of(cupoms);
    
            effects.loadCupomsEffect$.subscribe(response => {
                expect(response).toEqual(loadCupomsSuccess({cupoms}));
                done();
            })
        })
    
        it('when fail, then return load fail', (done) => {
            cupomService._response = throwError(error);
    
            effects.loadCupomsEffect$.subscribe(response => {
                expect(response).toEqual(loadCupomsFail({error}));
                done();
            })
        })

    })

    describe("Given save cupom", () => {

        beforeEach(() => {
            actions$ = of(saveCupom({cupom}));
        })

        it('when success, then return save success', (done) => {
            cupomService._response = of(cupoms);
    
            effects.saveCupomEffect$.subscribe(response => {
                expect(response).toEqual(saveCupomSuccess());
                done();
            })
        })
    
        it('when fail, then return save fail', (done) => {
            cupomService._response = throwError(error);
    
            effects.saveCupomEffect$.subscribe(response => {
                expect(response).toEqual(saveCupomFail({error}));
                done();
            })
        })

    })

    describe("Given save cupom success", () => {

        beforeEach(() => {
            actions$ = of(saveCupomSuccess());
        })

        it('then return load cupoms', (done) => {
            effects.saveCupomSuccessEffect$.subscribe(response => {
                expect(response).toEqual(loadCupoms());
                done();
            })
        })

    })

});

class CupomServiceMock {
    _response = of({});
    find() {
        return this._response;
    }
    save() {
        return this._response;
    }
}