import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { BlankComponent } from 'src/mock/blank-component/blank.component.mock';
import { PageMock } from 'src/mock/page.mock';
import { ProductsComponent } from './products.component';
import { ProductsModule } from './products.module';
import { loadSuccess } from './store/products.actions';
import { productsReducer } from './store/products.reducers';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let page: PageMock;
  let store: Store<AppState>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductsModule,
        RouterTestingModule.withRoutes([{
          path: "products/:id", component: BlankComponent
        }]),
        StoreModule.forRoot([]),
        StoreModule.forFeature('products', productsReducer)
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    store = TestBed.inject(Store);
    location = TestBed.inject(Location);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('given page starts, then load products', done => {
    store.select('products').subscribe(state => {
      expect(state.isLoading).toBeTruthy();
      done();
    })
  });

  describe('given loading products', () => {

    it('then show products loader', () => {
      expect(page.querySelector('[test-id="products-loader"]')).not.toBeNull();
    });

    it('then hide products', () => {
      expect(page.querySelector('[test-id="products"]')).toBeNull();
    });

  })

  describe('given products loaded', () => {

    beforeEach(() => {
      const products = [{id: 1}, {id: 2}] as any;
      store.dispatch(loadSuccess({products}));
      fixture.detectChanges();
    })

    it('then hide products loader', () => {
      expect(page.querySelector('[test-id="products-loader"]')).toBeNull();
    });

    it('then show products', () => {
      expect(page.querySelector('[test-id="products"]')).not.toBeNull();
    });

    it('when click on product, then go to product page', done => {
      page.querySelectorAll('table tbody tr')[0].click();
      fixture.detectChanges();

      setTimeout(() => {
        expect(location.path()).toEqual('/products/1');
        done();
      }, 100)
    });

  })

});
