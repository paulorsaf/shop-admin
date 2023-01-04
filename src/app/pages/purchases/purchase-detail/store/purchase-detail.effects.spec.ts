import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { PurchaseDetailEffects } from './purchase-detail.effects';
import { EffectsModule } from "@ngrx/effects";
import { PurchaseServiceMock } from "src/mock/purchase-service.mock";
import { PurchaseService } from "src/app/services/purchase/purchase.service";
import { cancelPurchaseProduct, cancelPurchaseProductFail, cancelPurchaseProductSuccess, editPurchaseProduct, editPurchaseProductFail, editPurchaseProductSuccess, loadPurchaseDetail, loadPurchaseDetailFail, loadPurchaseDetailSuccess, sendPurchaseToSystem, sendPurchaseToSystemFail, sendPurchaseToSystemSuccess, updatePurchaseStatus, updatePurchaseStatusFail, updatePurchaseStatusSuccess } from "./purchase-detail.actions";
import { provideMockStore } from "@ngrx/store/testing";

describe('PurchaseDetailEffects', () => {

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

    describe("Given send purchase to system", () => {

        beforeEach(() => {
            actions$ = of(sendPurchaseToSystem());
        })

        it('when success, then return send purchase to system success', (done) => {
            purchaseService._response = of(purchase);
    
            effects.sendToSystemEffect$.subscribe(response => {
                expect(response).toEqual(sendPurchaseToSystemSuccess());
                done();
            })
        })
    
        it('when fail, then return update purchase status fail', (done) => {
            purchaseService._response = throwError(error);
    
            effects.sendToSystemEffect$.subscribe(response => {
                expect(response).toEqual(sendPurchaseToSystemFail({error}));
                done();
            })
        })

    })

    describe("Given send purchase to system success", () => {

        beforeEach(() => {
            actions$ = of(sendPurchaseToSystemSuccess());
        })

        it('then return load purchase detail', (done) => {
            effects.sendToSystemSuccessEffect$.subscribe(response => {
                expect(response).toEqual(loadPurchaseDetail({id: "anyPurchaseId"}));
                done();
            })
        })

    })

    describe("Given edit purchase product", () => {

        beforeEach(() => {
            actions$ = of(editPurchaseProduct({
                productId: "anyProductId",
                stockId: "anyStockId",
                value: 10
            }));
        })

        it('when success, then return edit purchase product success', (done) => {
            purchaseService._response = of(purchase);
    
            effects.editPurchaseProductEffect$.subscribe(response => {
                expect(response).toEqual(editPurchaseProductSuccess());
                done();
            })
        })
    
        it('when fail, then return edit purchase product fail', (done) => {
            purchaseService._response = throwError(error);
    
            effects.editPurchaseProductEffect$.subscribe(response => {
                expect(response).toEqual(editPurchaseProductFail({error}));
                done();
            })
        })

    })

    describe("Given update purchase status success", () => {

        beforeEach(() => {
            actions$ = of(editPurchaseProductSuccess());
        })

        it('then return load purchase detail', (done) => {
            effects.editPurchaseProductSuccessEffect$.subscribe(response => {
                expect(response).toEqual(loadPurchaseDetail({id: "anyPurchaseId"}));
                done();
            })
        })

    })

    describe("Given cancel purchase product", () => {

        beforeEach(() => {
            actions$ = of(cancelPurchaseProduct({id: "anyProductId", stockId: "anyStockId"}));
        })

        it('when success, then return cancel purchase product success', (done) => {
            purchaseService._response = of(purchase);
    
            effects.cancelPurchaseProductEffect$.subscribe(response => {
                expect(response).toEqual(cancelPurchaseProductSuccess());
                done();
            })
        })
    
        it('when fail, then return edit purchase product fail', (done) => {
            purchaseService._response = throwError(error);
    
            effects.cancelPurchaseProductEffect$.subscribe(response => {
                expect(response).toEqual(cancelPurchaseProductFail({error}));
                done();
            })
        })

    })

    describe("given cancel purchase status success", () => {

        beforeEach(() => {
            actions$ = of(cancelPurchaseProductSuccess());
        })

        it('then return load purchase detail', (done) => {
            effects.cancelPurchaseProductSuccessEffect$.subscribe(response => {
                expect(response).toEqual(loadPurchaseDetail({id: "anyPurchaseId"}));
                done();
            })
        })

    })

});