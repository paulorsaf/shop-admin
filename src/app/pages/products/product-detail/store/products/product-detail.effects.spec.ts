import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, take, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { ProductDetailEffects } from './product-detail.effects';
import { EffectsModule } from "@ngrx/effects";
import { provideMockStore } from "@ngrx/store/testing";
import { ProductServiceMock } from "src/mock/product-service.mock";
import { loadDetail, loadDetailFail, loadDetailSuccess, loadStock, loadStockFail, loadStockSuccess, removeStock, removeStockFail, removeStockSuccess, saveDetail, saveDetailFail, saveDetailSuccess, saveStockOption, saveStockOptionFail, saveStockOptionSuccess, updateStockOption, updateStockOptionFail, updateStockOptionSuccess, uploadImage, uploadImageFail, uploadImageSuccess } from "./product-detail.actions";
import { ProductService } from "src/app/services/product/product.service";
import { StockService } from "src/app/services/stock/stock.service";
import { StockServiceMock } from "src/mock/stock-service.mock";
import { AppState } from "src/app/store/app-state";

describe('ProductDetailEffects', () => {

    let actions$ = new Observable<Action>();
    let effects: ProductDetailEffects;
    let productService: ProductServiceMock;
    let stockService: StockServiceMock;

    const error = {error: "error"};
    const product = {name: 'anyName'} as any;
    const stock = {id: "anyStockId"} as any;

    const initialState: AppState = {
        productDetail: {
            product: {
                id: '1'
            },
            stock: {
                id: '2'
            }
        }
    } as any;

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
                provideMockStore({initialState}),
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

    describe("Given save stock", () => {

        beforeEach(() => {
            actions$ = of(saveStockOption({stock: {id: 1} as any}));
        })

        it('when stock doesnt have an id, then create stock', done => {
            stockService._response = of(stock);
    
            effects.saveStockOptionEffect$.subscribe(() => {
                expect(stockService._isCreated).toBeTruthy()
                done();
            })
        })

        it('when stock has an id, then add stock', done => {
            stockService._response = of(stock);
    
            effects.saveStockOptionEffect$.subscribe(() => {
                expect(stockService._isAdded).toBeTruthy()
                done();
            })
        })

        it('when success, then return save stock success', (done) => {
            stockService._response = of(stock);
    
            effects.saveStockOptionEffect$.subscribe(response => {
                expect(response).toEqual(saveStockOptionSuccess());
                done();
            })
        })
    
        it('when fail, then return save stock fail', (done) => {
            stockService._response = throwError(error);
    
            effects.saveStockOptionEffect$.subscribe(response => {
                expect(response).toEqual(saveStockOptionFail({error}));
                done();
            })
        })

    })

    describe("Given save stock success", () => {

        beforeEach(() => {
            actions$ = of(saveStockOptionSuccess());
        })

        it('then return load stock', (done) => {
            effects.saveStockOptionSuccessEffect$.subscribe(response => {
                expect(response).toEqual(loadStock({id: '1'}));
                done();
            })
        })

    })

    describe("Given upload image", () => {

        beforeEach(() => {
            actions$ = of(uploadImage({image: {} as any}));
        })

        it('when success, then return load stock success', (done) => {
            productService._response = of({});
    
            effects.uploadImageEffect$.subscribe(response => {
                expect(response).toEqual(uploadImageSuccess());
                done();
            })
        })
    
        it('when fail, then return load stock fail', (done) => {
            productService._response = throwError(error);
    
            effects.uploadImageEffect$.subscribe(response => {
                expect(response).toEqual(uploadImageFail({error}));
                done();
            })
        })

    })

    describe("Given upload image success", () => {

        beforeEach(() => {
            actions$ = of(uploadImageSuccess());
        })

        it('then return load detail', (done) => {
            effects.uploadImageSuccessEffect$.subscribe(response => {
                expect(response).toEqual(loadDetail({id: '1'}));
                done();
            })
        })

    })

    describe("Given remove stock option", () => {

        beforeEach(() => {
            actions$ = of(removeStock({stockOption: {id: 1} as any}));
        })

        it('when success, then return remove stock option success', (done) => {
            stockService._response = of({});
    
            effects.removeStockEffect$.subscribe(response => {
                expect(response).toEqual(removeStockSuccess());
                done();
            })
        })
    
        it('when fail, then return remove stock option fail', (done) => {
            stockService._response = throwError(error);
    
            effects.removeStockEffect$.subscribe(response => {
                expect(response).toEqual(removeStockFail({error}));
                done();
            })
        })

    })

    describe("Given remove stock success", () => {

        beforeEach(() => {
            actions$ = of(removeStockSuccess());
        })

        it('then return load detail', (done) => {
            effects.removeStockSuccessEffect$.subscribe(response => {
                expect(response).toEqual(loadStock({id: '1'}));
                done();
            })
        })

    })

    describe("Given update stock option", () => {

        beforeEach(() => {
            actions$ = of(updateStockOption({stockOption: {id: 1} as any}));
        })

        it('when success, then return update stock option success', (done) => {
            stockService._response = of({});
    
            effects.updateStockOptionEffect$.subscribe(response => {
                expect(response).toEqual(updateStockOptionSuccess());
                done();
            })
        })
    
        it('when fail, then return update stock option fail', (done) => {
            stockService._response = throwError(error);
    
            effects.updateStockOptionEffect$.subscribe(response => {
                expect(response).toEqual(updateStockOptionFail({error}));
                done();
            })
        })

    })

    describe("Given update stock product success", () => {

        beforeEach(() => {
            actions$ = of(updateStockOptionSuccess());
        })

        it('then return load detail', (done) => {
            effects.updateStockOptionSuccessEffect$.subscribe(response => {
                expect(response).toEqual(loadStock({id: '1'}));
                done();
            })
        })

    })

});