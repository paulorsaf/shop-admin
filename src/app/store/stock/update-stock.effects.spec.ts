import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { UpdateStockEffects } from './update-stock.effects';
import { EffectsModule } from "@ngrx/effects";
import { provideMockStore } from "@ngrx/store/testing";
import { StockService } from "src/app/services/stock/stock.service";
import { updateStock, updateStockFail, updateStockSuccess } from "./update-stock.actions";
import { RouterTestingModule } from "@angular/router/testing";
import { BlankComponent } from "src/mock/blank-component/blank.component.mock";
import { loadProducts } from "src/app/pages/products/store/products/products.actions";

describe('UpdateStockEffects', () => {

    let actions$ = new Observable<Action>();
    let effects: UpdateStockEffects;
    let stockService: UpdateStockServiceMock;

    const error = {error: "error"};

    beforeEach(() => {
        stockService = new UpdateStockServiceMock();

        TestBed.configureTestingModule({
            imports: [
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([UpdateStockEffects]),
                RouterTestingModule.withRoutes([
                    { path: "products", component: BlankComponent }
                ])
            ],
            providers: [
                UpdateStockEffects,
                provideMockStore({}),
                provideMockActions(() => actions$)
            ],
        })
        .overrideProvider(StockService, {useValue: stockService});

        effects = TestBed.get(UpdateStockEffects);
    })

    describe("Given update stock", () => {

        beforeEach(() => {
            actions$ = of(updateStock());
        })

        it('when success, then return update stock success', (done) => {
            stockService._response = of({});
    
            effects.updateStockEffect$.subscribe(response => {
                expect(response).toEqual(updateStockSuccess());
                done();
            })
        })
    
        it('when fail, then return update stock fail', (done) => {
            stockService._response = throwError(error);
    
            effects.updateStockEffect$.subscribe(response => {
                expect(response).toEqual(updateStockFail({error}));
                done();
            })
        })

    })

    describe("Given update stock success", () => {

        beforeEach(() => {
            actions$ = of(updateStockSuccess());
        })

        it('when user is on products page, then return load products', (done) => {
            spyOn(effects, 'isProductsPage').and.returnValue(true);

            effects.updateStockEffectSuccess$.subscribe(response => {
                expect(response).toEqual(loadProducts());
                done();
            })
        })
    
        it('when user is not on products page, then do not return', (done) => {
            spyOn(effects, 'isProductsPage').and.returnValue(false);

            let hasReturned = false;
            effects.updateStockEffectSuccess$.subscribe(() => {
                hasReturned = true;
            })

            setTimeout(() => {
                expect(hasReturned).toBeFalsy();
                done();
            }, 100)
        })

    })

});

class UpdateStockServiceMock {
    _response: any;
    updateStock() {
        return this._response || of({});
    }
}