import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { Product } from 'src/app/model/product/product';
import { AppState } from 'src/app/store/app-state';
import { ActivatedRouteMock } from 'src/mock/activated-route.mock';
import { PageMock } from 'src/mock/page.mock';
import { categoriesReducer } from '../../categories/store/categories.reducers';
import { ProductsModule } from '../products.module';
import { ProductDetailComponent } from './product-detail.component';
import { loadDetailSuccess } from './store/products/product-detail.actions';
import { productDetailReducer } from './store/products/product-detail.reducers';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let store: Store<AppState>;
  let page: PageMock;
  let activatedRoute: ActivatedRouteMock;

  beforeEach(async () => {
    activatedRoute = new ActivatedRouteMock();

    await TestBed.configureTestingModule({
      imports: [
        ProductsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('categories', categoriesReducer),
        StoreModule.forFeature('productDetail', productDetailReducer)
      ]
    })
    .overrideProvider(ActivatedRoute, {useValue: activatedRoute})
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
    
    activatedRoute.value = '1';
    fixture.detectChanges();
  });

  it('given page starts, then create form', () => {
    expect(component.form).not.toBeUndefined();
  });

  it('given page starts, then load product by id', done => {
    store.select('productDetail').subscribe(state => {
      expect(state.isLoading).toBeTruthy();
      done();
    })
  });

  it('given page starts, then load categories', done => {
    store.select('categories').subscribe(state => {
      expect(state.isLoading).toBeTruthy();
      done();
    })
  });

  describe('given is loading product by id', () => {

    it('then show product loader', () => {
      expect(page.querySelector('[test-id="product-loader"]')).not.toBeNull();
    })

    it('then hide product detail', () => {
      expect(page.querySelector('[test-id="product"]')).toBeNull();
    })

  })

  describe('given product by id is loaded', () => {

    beforeEach(() => {
      const product = {id: 1} as any;
      store.dispatch(loadDetailSuccess({product}));
      fixture.detectChanges();
    })

    it('then hide product loader', () => {
      expect(page.querySelector('[test-id="product-loader"]')).toBeNull();
    })

    it('then show product detail', () => {
      expect(page.querySelector('[test-id="product"]')).not.toBeNull();
    })

  })

});
