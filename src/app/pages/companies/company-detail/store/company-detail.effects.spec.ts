import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { CompanyDetailEffects } from './company-detail.effects';
import { EffectsModule } from "@ngrx/effects";
import { provideMockStore } from "@ngrx/store/testing";
import { loadCompanyDetail, loadCompanyDetailFail, loadCompanyDetailSuccess, saveCompanyDetail, saveCompanyDetailAddress, saveCompanyDetailAddressFail, saveCompanyDetailAddressSuccess, saveCompanyDetailFail, saveCompanyDetailLogo, saveCompanyDetailLogoFail, saveCompanyDetailLogoSuccess, saveCompanyDetailSuccess } from "./company-detail.actions";
import { CompanyServiceMock } from "src/mock/company-service.mock";
import { CompanyService } from "src/app/services/company/company.service";

describe('CompanyDetailEffects', () => {

    let actions$ = new Observable<Action>();
    let effects: CompanyDetailEffects;
    let companyService: CompanyServiceMock;

    const company = {id: "anyId"} as any;
    const error = {error: "error"};

    beforeEach(() => {
        companyService = new CompanyServiceMock();

        TestBed.configureTestingModule({
            imports: [
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([CompanyDetailEffects])
            ],
            providers: [
                CompanyDetailEffects,
                provideMockStore({initialState: {
                    companyDetail: {
                        company: {
                            id: "anyCompanyId"
                        }
                    }
                }}),
                provideMockActions(() => actions$)
            ],
        })
        .overrideProvider(CompanyService, {useValue: companyService});

        effects = TestBed.get(CompanyDetailEffects);
    })

    describe("Given find company detail by id", () => {

        beforeEach(() => {
            actions$ = of(loadCompanyDetail({id: "anyId"}));
        })

        it('when success, then return save company detail success', (done) => {
            companyService._response = of(company);
    
            effects.loadCompanyDetailEffect$.subscribe(response => {
                expect(response).toEqual(loadCompanyDetailSuccess({company}));
                done();
            })
        })
    
        it('when fail, then return save company detail fail', (done) => {
            companyService._response = throwError(error);
    
            effects.loadCompanyDetailEffect$.subscribe(response => {
                expect(response).toEqual(loadCompanyDetailFail({error}));
                done();
            })
        })

    })

    describe("Given update company detail", () => {

        beforeEach(() => {
            actions$ = of(saveCompanyDetail({name: "anyName"}));
        })

        it('when success, then return save company detail success', (done) => {
            companyService._response = of({});
    
            effects.saveCompanyDetailEffect$.subscribe(response => {
                expect(response).toEqual(saveCompanyDetailSuccess());
                done();
            })
        })
    
        it('when fail, then return save company detail fail', (done) => {
            companyService._response = throwError(error);
    
            effects.saveCompanyDetailEffect$.subscribe(response => {
                expect(response).toEqual(saveCompanyDetailFail({error}));
                done();
            })
        })

    })

    describe("Given save company detail address", () => {

        beforeEach(() => {
            actions$ = of(saveCompanyDetailAddress({address: {id: "anyAddress"} as any}));
        })

        it('when success, then return save company detail success', (done) => {
            companyService._response = of({});
    
            effects.saveCompanyDetailAddressEffect$.subscribe(response => {
                expect(response).toEqual(saveCompanyDetailAddressSuccess());
                done();
            })
        })
    
        it('when fail, then return save company detail fail', (done) => {
            companyService._response = throwError(error);
    
            effects.saveCompanyDetailAddressEffect$.subscribe(response => {
                expect(response).toEqual(saveCompanyDetailAddressFail({error}));
                done();
            })
        })

    })

    describe("Given save company detail logo", () => {

        beforeEach(() => {
            actions$ = of(saveCompanyDetailLogo({file: {id: "anyFile"} as any}));
        })

        it('when success, then return save company detail logo success', (done) => {
            companyService._response = of({});
    
            effects.saveCompanyDetailLogoEffect$.subscribe(response => {
                expect(response).toEqual(saveCompanyDetailLogoSuccess());
                done();
            })
        })
    
        it('when fail, then return save company detail logo fail', (done) => {
            companyService._response = throwError(error);
    
            effects.saveCompanyDetailLogoEffect$.subscribe(response => {
                expect(response).toEqual(saveCompanyDetailLogoFail({error}));
                done();
            })
        })

    })

    describe("Given save company detail logo success", () => {

        beforeEach(() => {
            actions$ = of(saveCompanyDetailLogoSuccess());
        })

        it('then return load company detail', (done) => {
            effects.saveCompanyDetailLogoSuccessEffect$.subscribe(response => {
                expect(response).toEqual(loadCompanyDetail({id: "anyCompanyId"}));
                done();
            })
        })

    })

});