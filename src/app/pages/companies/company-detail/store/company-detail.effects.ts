import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Address } from "src/app/model/address/address";
import { CompanyService } from "src/app/services/company/company.service";
import { AppState } from "src/app/store/app-state";
import { loadCompanyDetail, loadCompanyDetailFail, loadCompanyDetailSuccess, saveCompanyDetail, saveCompanyDetailAddress, saveCompanyDetailAddressFail, saveCompanyDetailAddressSuccess, saveCompanyDetailFail, saveCompanyDetailSuccess } from "./company-detail.actions";

@Injectable()
export class CompanyDetailEffects {

    constructor(
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

    getStore(){
        return withLatestFrom(this.store);
    }

}