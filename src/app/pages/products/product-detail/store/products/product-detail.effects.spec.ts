import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { ProductDetailEffects } from './product-detail.effects';
import { EffectsModule } from "@ngrx/effects";
import { provideMockStore } from "@ngrx/store/testing";
import { ProductServiceMock } from "src/mock/product-service.mock";
import { loadDetail, loadDetailFail, loadDetailSuccess } from "./product-detail.actions";
import { ProductService } from "src/app/services/product/product.service";

describe('ProductDetailEffects', () => {

    let actions$ = new Observable<Action>();
    let effects: ProductDetailEffects;
    let productService: ProductServiceMock;

    const product = {id: '1'} as any;
    const error = {error: "error"};

    beforeEach(() => {
        productService = new ProductServiceMock();

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
        .overrideProvider(ProductService, {useValue: productService});

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

});