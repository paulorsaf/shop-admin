import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { ProductsEffects } from './products.effects';
import { EffectsModule } from "@ngrx/effects";
import { provideMockStore } from "@ngrx/store/testing";
import { ProductServiceMock } from "src/mock/product-service.mock";
import { loadProducts, loadProductsFail, loadMoreProducts, loadProductsSuccess, removeProduct, removeProductFail, removeProductSuccess, updateProductOnList, updateProductOnListFail, updateProductOnListSuccess, filterProducts, uploadProducts, uploadProductsSuccess, uploadProductsFail } from "./products.actions";
import { ProductService } from "src/app/services/product/product.service";
import { changeVisibilitySuccess } from "../../product-detail/store/products/product-detail.actions";

fdescribe('ProductsEffects', () => {

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

    describe("Given load products", () => {

        beforeEach(() => {
            actions$ = of(loadProducts());
        })

        it('when success, then return load success', (done) => {
            productService._response = of(products);
    
            effects.loadEffect$.subscribe(response => {
                expect(response).toEqual(loadProductsSuccess({products}));
                done();
            })
        })
    
        it('when fail, then return load fail', (done) => {
            productService._response = throwError(error);
    
            effects.loadEffect$.subscribe(response => {
                expect(response).toEqual(loadProductsFail({error}));
                done();
            })
        })

    })

    describe("Given filter products", () => {

        beforeEach(() => {
            const filter = {category: "anyCategoryId"} as any;
            actions$ = of(filterProducts({filter}));
        })

        it('when success, then return load success', (done) => {
            productService._response = of(products);
    
            effects.loadEffect$.subscribe(response => {
                expect(response).toEqual(loadProductsSuccess({products}));
                done();
            })
        })
    
        it('when fail, then return load fail', (done) => {
            productService._response = throwError(error);
    
            effects.loadEffect$.subscribe(response => {
                expect(response).toEqual(loadProductsFail({error}));
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
                expect(response).toEqual(loadProductsSuccess({products}));
                done();
            })
        })
    
        it('when fail, then return load fail', (done) => {
            productService._response = throwError(error);
    
            effects.loadEffect$.subscribe(response => {
                expect(response).toEqual(loadProductsFail({error}));
                done();
            })
        })

    })

    describe("Given remove", () => {

        beforeEach(() => {
            const product = {id: 1} as any;
            actions$ = of(removeProduct({product}));
        })

        it('when success, then return load success', (done) => {
            productService._response = of(products);
    
            effects.removeEffect$.subscribe(response => {
                expect(response).toEqual(removeProductSuccess());
                done();
            })
        })
    
        it('when fail, then return load fail', (done) => {
            productService._response = throwError(error);
    
            effects.removeEffect$.subscribe(response => {
                expect(response).toEqual(removeProductFail({error}));
                done();
            })
        })

    })

    describe("Given remove success", () => {

        beforeEach(() => {
            actions$ = of(removeProductSuccess());
        })

        it('then return load', (done) => {
            effects.removeSuccessEffect$.subscribe(response => {
                expect(response).toEqual(loadProducts());
                done();
            })
        })

    })

    describe("given change visibility success", () => {

        beforeEach(() => {
            actions$ = of(changeVisibilitySuccess({id: "anyProductId"}));
        })

        it('then return update product on list', (done) => {
            effects.changeVisibilitySuccessEffect$.subscribe(response => {
                expect(response).toEqual(updateProductOnList({id: "anyProductId"}));
                done();
            })
        })

    })

    describe("given update product on list", () => {

        beforeEach(() => {
            actions$ = of(updateProductOnList({id: "anyProductId"}));
        })

        it('when success, then return update product on list success', (done) => {
            const product = {id: "anyProductId"} as any;
            productService._response = of(product);
    
            effects.updateProductOnList$.subscribe(response => {
                expect(response).toEqual(updateProductOnListSuccess({product}));
                done();
            })
        })
    
        it('when fail, then return update product on list error', (done) => {
            productService._response = throwError(error);
    
            effects.updateProductOnList$.subscribe(response => {
                expect(response).toEqual(updateProductOnListFail({error}));
                done();
            })
        })

    })

    describe("given upload product", () => {

        beforeEach(() => {
            const file = {id: "anyId"} as any;
            actions$ = of(uploadProducts({file}));
        })

        it('when success, then return update product success', (done) => {
            const product = {id: "anyProductId"} as any;
            productService._response = of(product);
    
            effects.uploadProducts$.subscribe(response => {
                expect(response).toEqual(uploadProductsSuccess());
                done();
            })
        })
    
        it('when fail, then return upload product error', (done) => {
            productService._response = throwError(error);
    
            effects.uploadProducts$.subscribe(response => {
                expect(response).toEqual(uploadProductsFail({error}));
                done();
            })
        })

    })

    describe("given upload products success", () => {

        beforeEach(() => {
            actions$ = of(uploadProductsSuccess());
        })

        it('then return load products', (done) => {
            effects.uploadProductsSuccess$.subscribe(response => {
                expect(response).toEqual(loadProducts());
                done();
            })
        })

    })

});