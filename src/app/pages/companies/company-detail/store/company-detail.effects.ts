import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Address } from "src/app/model/address/address";
import { AddressService } from "src/app/services/address/address.service";
import { CompanyService } from "src/app/services/company/company.service";
import { AppState } from "src/app/store/app-state";
import { clearAddressByZip, loadAddressByZipCode, loadAddressByZipCodeFail, loadAddressByZipCodeSuccess, loadCompanyDetail, loadCompanyDetailFail, loadCompanyDetailSuccess, saveCompanyDetail, saveCompanyDetailAddress, saveCompanyDetailAddressFail, saveCompanyDetailAddressSuccess, saveCompanyDetailFail, saveCompanyDetailLogo, saveCompanyDetailLogoFail, saveCompanyDetailLogoSuccess, saveCompanyDetailSuccess } from "./company-detail.actions";

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
                    action.name
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

    getStore(){
        return withLatestFrom(this.store);
    }

}