import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AddressService } from "src/app/services/address/address.service";
import { CompanyService } from "src/app/services/company/company.service";
import { AppState } from "src/app/store/app-state";
import { clearAddressByZip, loadAddressByZipCode, loadAddressByZipCodeFail, loadAddressByZipCodeSuccess, loadCompanyDetail, loadCompanyDetailFail, loadCompanyDetailSuccess, saveCompanyDetail, saveCompanyDetailAboutUs, saveCompanyDetailAboutUsFail, saveCompanyDetailAboutUsSuccess, saveCompanyDetailAddress, saveCompanyDetailAddressFail, saveCompanyDetailAddressSuccess, saveCompanyDetailFail, saveCompanyDetailLogo, saveCompanyDetailLogoFail, saveCompanyDetailLogoSuccess, saveCompanyDetailPayment, saveCompanyDetailPaymentFail, saveCompanyDetailPaymentSuccess, saveCompanyDetailSuccess, saveDeliveryPrice, saveDeliveryPriceFail, saveDeliveryPriceSuccess, saveServiceTax, saveServiceTaxFail, saveServiceTaxSuccess } from "./company-detail.actions";

@Injectable()
export class CompanyDetailEffects {

    constructor(
        private addressService: AddressService,
        private companyService: CompanyService,
        private actions$: Actions,
        private store: Store<AppState>
    ){
    }

    loadCompanyDetailEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCompanyDetail),
            switchMap((params: {id: string}) =>
                this.companyService.findById(params.id).pipe(
                    map(company => loadCompanyDetailSuccess({company})),
                    catchError(error => of(loadCompanyDetailFail({error})))
                )
            )
        )
    )

    saveCompanyDetailAddressEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveCompanyDetailAddress),
            this.getStore(),
            switchMap(([action, storeState]: [action: any, storeState: AppState]) => 
                this.companyService.updateAddress(
                    storeState.companyDetail.company?.id || "",
                    action.address
                ).pipe(
                    map(() => saveCompanyDetailAddressSuccess()),
                    catchError(error => of(saveCompanyDetailAddressFail({error})))
                )
            )
        )
    )

    saveCompanyDetailEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveCompanyDetail),
            this.getStore(),
            switchMap(([action, storeState]: [action: any, storeState: AppState]) => 
                this.companyService.update(
                    storeState.companyDetail.company?.id || "",
                    action.details
                ).pipe(
                    map(() => saveCompanyDetailSuccess()),
                    catchError(error => of(saveCompanyDetailFail({error})))
                )
            )
        )
    )

    saveCompanyDetailLogoEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveCompanyDetailLogo),
            this.getStore(),
            switchMap(([action, storeState]: [action: any, storeState: AppState]) => 
                this.companyService.updateLogo(
                    storeState.companyDetail.company?.id || "",
                    action.file
                ).pipe(
                    map(() => saveCompanyDetailLogoSuccess()),
                    catchError(error => of(saveCompanyDetailLogoFail({error})))
                )
            )
        )
    )

    saveCompanyDetailLogoSuccessEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveCompanyDetailLogoSuccess),
            this.getStore(),
            switchMap(([action, storeState]: [action: any, storeState: AppState]) => 
                of(loadCompanyDetail({id: storeState.companyDetail.company?.id || ""}))
            )
        )
    )

    loadAddressByZipCodeEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAddressByZipCode),
            switchMap((params: {zipCode: string}) =>
                this.addressService.findByZipCode(params.zipCode).pipe(
                    map(address => loadAddressByZipCodeSuccess({address})),
                    catchError(error => of(loadAddressByZipCodeFail({error})))
                )
            )
        )
    )

    loadAddressByZipCodeSuccessEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAddressByZipCodeSuccess),
            switchMap(() => of(clearAddressByZip()))
        )
    )

    saveCompanyDetailAboutUsEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveCompanyDetailAboutUs),
            this.getStore(),
            switchMap(([action, storeState]: [action: any, storeState: AppState]) => 
                this.companyService.updateAboutUs(
                    storeState.companyDetail.company?.id || "",
                    action.html
                ).pipe(
                    map(() => saveCompanyDetailAboutUsSuccess()),
                    catchError(error => of(saveCompanyDetailAboutUsFail({error})))
                )
            )
        )
    )

    saveCompanyDetailPaymentEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveCompanyDetailPayment),
            this.getStore(),
            switchMap(([action, storeState]: [action: any, storeState: AppState]) => 
                this.companyService.updatePayment(
                    storeState.companyDetail.company?.id || "",
                    action.payment
                ).pipe(
                    map(() => saveCompanyDetailPaymentSuccess()),
                    catchError(error => of(saveCompanyDetailPaymentFail({error})))
                )
            )
        )
    )

    saveCompanyDetailDeliveryPriceEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveDeliveryPrice),
            withLatestFrom(this.store.select(store => store.companyDetail.company?.id || "")),
            switchMap(([action, companyId]) => 
                this.companyService.updateDeliveryPrice(
                    companyId,
                    action.hasDeliveryByMail,
                    action.price
                ).pipe(
                    map(() => saveDeliveryPriceSuccess()),
                    catchError(error => of(saveDeliveryPriceFail({error})))
                )
            )
        )
    )

    saveCompanyDetailServiceTaxEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveServiceTax),
            this.getStore(),
            switchMap(([action, storeState]: [action: any, storeState: AppState]) => 
                this.companyService.updateServiceTax(
                    storeState.companyDetail.company?.id || "",
                    action.serviceTax
                ).pipe(
                    map(() => saveServiceTaxSuccess()),
                    catchError(error => of(saveServiceTaxFail({error})))
                )
            )
        )
    )

    getStore(){
        return withLatestFrom(this.store);
    }

}