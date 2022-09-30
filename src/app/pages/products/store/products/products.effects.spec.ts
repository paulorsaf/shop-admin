import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { ProductsEffects } from './products.effects';
import { EffectsModule } from "@ngrx/effects";
import { provideMockStore } from "@ngrx/store/testing";
import { ProductServiceMock } from "src/mock/product-service.mock";
import { load, loadFail, loadMoreProducts, loadSuccess, remove, removeFail, removeSuccess } from "./products.actions";
import { ProductService } from "src/app/services/product/product.service";

describe('ProductsEffects', () => {

    let actions$ = new Observable<Action>();
    let effects: ProductsEffects;
    let productService: ProductServiceMock;

    const products = [{id: '1'}] as any;
    const error = {error: "error"};

    beforeEach(() => {
        productService = new ProductServiceMock();

        TestBed.configureTestingModule({
            imports: [
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([ProductsEffects])
            ],
            providers: [
                ProductsEffects,
                provideMockStore({initialState: {products: {page: 0}}}),
                provideMockActions(() => actions$)
            ],
        })
        .overrideProvider(ProductService, {useValue: productService});

        effects = TestBed.get(ProductsEffects);
    })

    describe("Given load", () => {

        beforeEach(() => {
            actions$ = of(load());
        })

        it('when success, then return load success', (done) => {
            productService._response = of(products);
    
            effects.loadEffect$.subscribe(response => {
                expect(response).toEqual(loadSuccess({products}));
                done();
            })
        })
    
        it('when fail, then return load fail', (done) => {
            productService._response = throwError(error);
    
            effects.loadEffect$.subscribe(response => {
                expect(response).toEqual(loadFail({error}));
                done();
            })
        })

    })

    describe("Given load more products", () => {

        beforeEach(() => {
            actions$ = of(loadMoreProducts());
        })

        it('when success, then return load success', (done) => {
            productService._response = of(products);
    
            effects.loadEffect$.subscribe(response => {
                expect(response).toEqual(loadSuccess({products}));
                done();
            })
        })
    
        it('when fail, then return load fail', (done) => {
            productService._response = throwError(error);
    
            effects.loadEffect$.subscribe(response => {
                expect(response).toEqual(loadFail({error}));
                done();
            })
        })

    })

    describe("Given remove", () => {

        beforeEach(() => {
            const product = {id: 1} as any;
            actions$ = of(remove({product}));
        })

        it('when success, then return load success', (done) => {
            productService._response = of(products);
    
            effects.removeEffect$.subscribe(response => {
                expect(response).toEqual(removeSuccess());
                done();
            })
        })
    
        it('when fail, then return load fail', (done) => {
            productService._response = throwError(error);
    
            effects.removeEffect$.subscribe(response => {
                expect(response).toEqual(removeFail({error}));
                done();
            })
        })

    })

    describe("Given remove success", () => {

        beforeEach(() => {
            actions$ = of(removeSuccess());
        })

        it('then return load', (done) => {
            effects.removeSuccessEffect$.subscribe(response => {
                expect(response).toEqual(load());
                done();
            })
        })

    })

});