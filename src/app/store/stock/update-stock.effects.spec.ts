import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { UpdateStockEffects } from './update-stock.effects';
import { EffectsModule } from "@ngrx/effects";
import { provideMockStore } from "@ngrx/store/testing";
import { StockService } from "src/app/services/stock/stock.service";
import { updateStock, updateStockFail, updateStockSuccess } from "./update-stock.actions";

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
                EffectsModule.forFeature([UpdateStockEffects])
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

});

class UpdateStockServiceMock {
    _response: any;
    updateStock() {
        return this._response || of({});
    }
}