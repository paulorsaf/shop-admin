import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, take, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { ProductDetailEffects } from './product-detail.effects';
import { EffectsModule } from "@ngrx/effects";
import { provideMockStore } from "@ngrx/store/testing";
import { ProductServiceMock } from "src/mock/product-service.mock";
import { clear, loadDetail, loadDetailFail, loadDetailSuccess, loadStock, loadStockFail, loadStockSuccess, saveDetail, saveDetailFail, saveDetailSuccess } from "./product-detail.actions";
import { ProductService } from "src/app/services/product/product.service";
import { StockService } from "src/app/services/stock/stock.service";
import { StockServiceMock } from "src/mock/stock-service.mock";

describe('ProductDetailEffects', () => {

    let actions$ = new Observable<Action>();
    let effects: ProductDetailEffects;
    let productService: ProductServiceMock;
    let stockService: StockServiceMock;

    const error = {error: "error"};
    const product = {name: 'anyName'} as any;
    const stock = [{id: "anyStockId"}] as any[];

    beforeEach(() => {
        productService = new ProductServiceMock();
        stockService = new StockServiceMock();

        TestBed.configureTestingModule({
            imports: [
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([ProductDetailEffects])
            ],
            providers: [
                ProductDetailEffects,
                provideMockStore({}),
                provideMockActions(() => actions$)
            ],
        })
        .overrideProvider(ProductService, {useValue: productService})
        .overrideProvider(StockService, {useValue: stockService});

        effects = TestBed.get(ProductDetailEffects);
    })

    describe("Given load detail", () => {

        beforeEach(() => {
            actions$ = of(loadDetail({id: '1'}));
        })

        it('when success, then return load detail success', (done) => {
            productService._response = of(product);
    
            effects.loadDetailEffect$.subscribe(response => {
                expect(response).toEqual(loadDetailSuccess({product}));
                done();
            })
        })
    
        it('when fail, then return load detail fail', (done) => {
            productService._response = throwError(error);
    
            effects.loadDetailEffect$.subscribe(response => {
                expect(response).toEqual(loadDetailFail({error}));
                done();
            })
        })

    })

    describe("Given save detail", () => {

        beforeEach(() => {
            actions$ = of(saveDetail({product}));
        })

        it('when product doesnt have an id, then call save', (done) => {
            productService._response = of(product);
    
            effects.saveDetailEffect$.pipe(take(1)).subscribe(() => {
                expect(productService._isSaved).toBeTruthy();
                done();
            })
        })

        it('when product has an id, then call update', (done) => {
            actions$ = of(saveDetail({product: {...product, id: '1'}}));

            productService._response = of(product);
    
            effects.saveDetailEffect$.pipe(take(1)).subscribe(() => {
                expect(productService._isUpdated).toBeTruthy();
                done();
            })
        })

        it('when success, then return save detail success', (done) => {
            productService._response = of(product);
    
            effects.saveDetailEffect$.pipe(take(1)).subscribe(response => {
                expect(response).toEqual(saveDetailSuccess());
                done();
            })
        })
    
        it('when fail, then return save detail fail', (done) => {
            productService._response = throwError(error);
    
            effects.saveDetailEffect$.pipe(take(1)).subscribe(response => {
                expect(response).toEqual(saveDetailFail({error}));
                done();
            })
        })

    })

    describe("Given save product detail success", () => {

        beforeEach(() => {
            actions$ = of(saveDetailSuccess());
        })

        it('then return clear product', (done) => {
            effects.saveDetailSuccessEffect$.subscribe(response => {
                expect(response).toEqual(clear());
                done();
            })
        })

    })

    describe("Given load stock", () => {

        beforeEach(() => {
            actions$ = of(loadStock({id: '1'}));
        })

        it('when success, then return load stock success', (done) => {
            stockService._response = of(stock);
    
            effects.loadStockEffect$.subscribe(response => {
                expect(response).toEqual(loadStockSuccess({stock}));
                done();
            })
        })
    
        it('when fail, then return load stock fail', (done) => {
            stockService._response = throwError(error);
    
            effects.loadStockEffect$.subscribe(response => {
                expect(response).toEqual(loadStockFail({error}));
                done();
            })
        })

    })

});