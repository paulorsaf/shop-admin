import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { PurchasesEffects } from './purchases.effects';
import { EffectsModule } from "@ngrx/effects";
import { provideMockStore } from "@ngrx/store/testing";
import { PurchaseServiceMock } from "src/mock/purchase-service.mock";
import { PurchaseService } from "src/app/services/purchase/purchase.service";
import { loadPurchases, loadPurchasesFail, loadPurchasesSuccess } from "./purchases.actions";

describe('PurchasesEffects', () => {

    let actions$ = new Observable<Action>();
    let effects: PurchasesEffects;
    let purchaseService: PurchaseServiceMock;

    const purchases = [{id: '1'}] as any;
    const error = {error: "error"};

    beforeEach(() => {
        purchaseService = new PurchaseServiceMock();

        TestBed.configureTestingModule({
            imports: [
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([PurchasesEffects])
            ],
            providers: [
                PurchasesEffects,
                provideMockStore({}),
                provideMockActions(() => actions$)
            ],
        })
        .overrideProvider(PurchaseService, {useValue: purchaseService});

        effects = TestBed.get(PurchasesEffects);
    })

    describe("Given load purchases", () => {

        beforeEach(() => {
            actions$ = of(loadPurchases());
        })

        it('when success, then return load success', (done) => {
            purchaseService._response = of(purchases);
    
            effects.loadPurchasesEffect$.subscribe(response => {
                expect(response).toEqual(loadPurchasesSuccess({purchases}));
                done();
            })
        })
    
        it('when fail, then return load fail', (done) => {
            purchaseService._response = throwError(error);
    
            effects.loadPurchasesEffect$.subscribe(response => {
                expect(response).toEqual(loadPurchasesFail({error}));
                done();
            })
        })

    })

});