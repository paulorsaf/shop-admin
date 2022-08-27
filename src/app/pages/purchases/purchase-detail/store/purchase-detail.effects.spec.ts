import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { PurchaseDetailEffects } from './purchase-detail.effects';
import { EffectsModule } from "@ngrx/effects";
import { StockServiceMock } from "src/mock/stock-service.mock";
import { PurchaseServiceMock } from "src/mock/purchase-service.mock";
import { PurchaseService } from "src/app/services/purchase/purchase.service";
import { loadPurchaseDetail, loadPurchaseDetailFail, loadPurchaseDetailSuccess, updatePurchaseStatus, updatePurchaseStatusFail, updatePurchaseStatusSuccess } from "./purchase-detail.actions";
import { provideMockStore } from "@ngrx/store/testing";

fdescribe('PurchaseDetailEffects', () => {

    let actions$ = new Observable<Action>();
    let effects: PurchaseDetailEffects;
    let purchaseService: PurchaseServiceMock;

    const error = {error: "error"};
    const purchase = {name: 'anyName'} as any;
    const initialState = {
        purchaseDetail: {
            purchase: {
                id: "anyPurchaseId"
            }
        }
    }

    beforeEach(() => {
        purchaseService = new PurchaseServiceMock();

        TestBed.configureTestingModule({
            imports: [
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([PurchaseDetailEffects])
            ],
            providers: [
                PurchaseDetailEffects,
                provideMockStore({initialState}),
                provideMockActions(() => actions$)
            ],
        })
        .overrideProvider(PurchaseService, {useValue: purchaseService});

        effects = TestBed.get(PurchaseDetailEffects);
    })

    describe("Given load detail", () => {

        beforeEach(() => {
            actions$ = of(loadPurchaseDetail({id: '1'}));
        })

        it('when success, then return load detail success', (done) => {
            purchaseService._response = of(purchase);
    
            effects.loadDetailEffect$.subscribe(response => {
                expect(response).toEqual(loadPurchaseDetailSuccess({purchase}));
                done();
            })
        })
    
        it('when fail, then return load detail fail', (done) => {
            purchaseService._response = throwError(error);
    
            effects.loadDetailEffect$.subscribe(response => {
                expect(response).toEqual(loadPurchaseDetailFail({error}));
                done();
            })
        })

    })

    describe("Given update purchase status", () => {

        beforeEach(() => {
            actions$ = of(updatePurchaseStatus({status: '1'}));
        })

        it('when success, then return update purchase status success', (done) => {
            purchaseService._response = of(purchase);
    
            effects.updatePurchaseStatusEffect$.subscribe(response => {
                expect(response).toEqual(updatePurchaseStatusSuccess());
                done();
            })
        })
    
        it('when fail, then return update purchase status fail', (done) => {
            purchaseService._response = throwError(error);
    
            effects.updatePurchaseStatusEffect$.subscribe(response => {
                expect(response).toEqual(updatePurchaseStatusFail({error}));
                done();
            })
        })

    })

    describe("Given update purchase status success", () => {

        beforeEach(() => {
            actions$ = of(updatePurchaseStatusSuccess());
        })

        it('then return load purchase detail', (done) => {
            effects.updatePurchaseStatusSuccessEffect$.subscribe(response => {
                expect(response).toEqual(loadPurchaseDetail({id: "anyPurchaseId"}));
                done();
            })
        })

    })

});