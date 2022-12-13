import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { CompanyDetailEffects } from './company-detail.effects';
import { EffectsModule } from "@ngrx/effects";
import { provideMockStore } from "@ngrx/store/testing";
import { clearAddressByZip, loadAddressByZipCode, loadAddressByZipCodeFail, loadAddressByZipCodeSuccess, loadCompanyDetail, loadCompanyDetailFail, loadCompanyDetailSuccess, saveCompanyDetail, saveCompanyDetailAboutUs, saveCompanyDetailAboutUsFail, saveCompanyDetailAboutUsSuccess, saveCompanyDetailAddress, saveCompanyDetailAddressFail, saveCompanyDetailAddressSuccess, saveCompanyDetailFail, saveCompanyDetailLogo, saveCompanyDetailLogoFail, saveCompanyDetailLogoSuccess, saveCompanyDetailPayment, saveCompanyDetailPaymentFail, saveCompanyDetailPaymentSuccess, saveCompanyDetailSuccess, saveDeliveryPrice, saveDeliveryPriceFail, saveDeliveryPriceSuccess } from "./company-detail.actions";
import { CompanyService } from "src/app/services/company/company.service";
import { AddressServiceMock } from "src/mock/address-service.mock";
import { AddressService } from "src/app/services/address/address.service";

describe('CompanyDetailEffects', () => {

    let actions$ = new Observable<Action>();
    let effects: CompanyDetailEffects;
    let addressService: AddressServiceMock;
    let companyService: CompanyServiceMock;

    const company = {id: "anyId"} as any;
    const error = {error: "error"};

    beforeEach(() => {
        addressService = new AddressServiceMock();
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
        .overrideProvider(AddressService, {useValue: addressService})
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
            const details = {id: "anyDetails"} as any;
            actions$ = of(saveCompanyDetail({details}));
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

    describe("Given load address by zip code", () => {

        beforeEach(() => {
            actions$ = of(loadAddressByZipCode({zipCode: "anyZipCode"}));
        })

        it('when success, then return load address by zip code success', (done) => {
            const address = {id: "anyAddress"} as any;
            addressService._response = of(address);
    
            effects.loadAddressByZipCodeEffect$.subscribe(response => {
                expect(response).toEqual(loadAddressByZipCodeSuccess({address}));
                done();
            })
        })
    
        it('when fail, then return load address by zip code fail', (done) => {
            addressService._response = throwError(error);
    
            effects.loadAddressByZipCodeEffect$.subscribe(response => {
                expect(response).toEqual(loadAddressByZipCodeFail({error}));
                done();
            })
        })

    })

    describe("Given load address by zip code success", () => {

        beforeEach(() => {
            const address = {id: "anyAddress"} as any;
            actions$ = of(loadAddressByZipCodeSuccess({address}));
        })

        it('then return clear address by zip code', (done) => {
            effects.loadAddressByZipCodeSuccessEffect$.subscribe(response => {
                expect(response).toEqual(clearAddressByZip());
                done();
            })
        })

    })

    describe("Given save company detail about us", () => {

        beforeEach(() => {
            actions$ = of(saveCompanyDetailAboutUs({html: "anyHtml"}));
        })

        it('when success, then return save company detail about us success', (done) => {
            companyService._response = of({});
    
            effects.saveCompanyDetailAboutUsEffect$.subscribe(response => {
                expect(response).toEqual(saveCompanyDetailAboutUsSuccess());
                done();
            })
        })
    
        it('when fail, then return save company detail about us fail', (done) => {
            companyService._response = throwError(error);
    
            effects.saveCompanyDetailAboutUsEffect$.subscribe(response => {
                expect(response).toEqual(saveCompanyDetailAboutUsFail({error}));
                done();
            })
        })

    })

    describe("Given save company detail payment", () => {

        beforeEach(() => {
            const payment = {id: "anyPayment"} as any;
            actions$ = of(saveCompanyDetailPayment({payment}));
        })

        it('when success, then return save company detail payment success', (done) => {
            companyService._response = of({});
    
            effects.saveCompanyDetailPaymentEffect$.subscribe(response => {
                expect(response).toEqual(saveCompanyDetailPaymentSuccess());
                done();
            })
        })
    
        it('when fail, then return save company detail payment fail', (done) => {
            companyService._response = throwError(error);
    
            effects.saveCompanyDetailPaymentEffect$.subscribe(response => {
                expect(response).toEqual(saveCompanyDetailPaymentFail({error}));
                done();
            })
        })

    })

    describe("Given save delivery price", () => {

        beforeEach(() => {
            actions$ = of(saveDeliveryPrice({price: 10}));
        })

        it('when success, then return save deliveryPrice success', (done) => {
            companyService._response = of({});
    
            effects.saveCompanyDetailDeliveryPriceEffect$.subscribe(response => {
                expect(response).toEqual(saveDeliveryPriceSuccess());
                done();
            })
        })
    
        it('when fail, then return save company detail about us fail', (done) => {
            companyService._response = throwError(error);
    
            effects.saveCompanyDetailDeliveryPriceEffect$.subscribe(response => {
                expect(response).toEqual(saveDeliveryPriceFail({error}));
                done();
            })
        })

    })

});

class CompanyServiceMock {

    _response: any = of({});

    findById() {
        return this._response;
    }
    update() {
        return this._response;
    }
    updateAboutUs() {
        return this._response;
    }
    updateAddress() {
        return this._response;
    }
    updateDeliveryPrice() {
        return this._response;
    }
    updateLogo() {
        return this._response;
    }
    updatePayment() {
        return this._response;
    }
    
}