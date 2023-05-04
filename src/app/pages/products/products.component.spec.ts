import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ButtonLoaderModule } from 'src/app/components/button-loader/button-loader.module';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { BlankComponent } from 'src/mock/blank-component/blank.component.mock';
import { MatDialogMock } from 'src/mock/mat-dialog.mock';
import { MessageServiceMock } from 'src/mock/message-service.mock';
import { PageMock } from 'src/mock/page.mock';
import { categoriesReducer } from '../categories/store/categories.reducers';
import { changeVisibilityFail, changeVisibilitySuccess } from './product-detail/store/products/product-detail.actions';
import { productDetailReducer } from './product-detail/store/products/product-detail.reducers';
import { ProductsComponent } from './products.component';
import { ProductsModule } from './products.module';
import { loadSuccess, removeFail, removeSuccess } from './store/products/products.actions';
import { productsReducer } from './store/products/products.reducers';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let page: PageMock;
  let store: Store<AppState>;
  let location: Location;
  let dialog: MatDialogMock;
  let messageService: MessageServiceMock;

  beforeEach(async () => {
    dialog = new MatDialogMock();
    messageService = new MessageServiceMock();

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ProductsModule,
        RouterTestingModule.withRoutes([{
          path: "products/:id", component: BlankComponent
        }]),
        ButtonLoaderModule,
        MatSlideToggleModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('categories', categoriesReducer),
        StoreModule.forFeature('products', productsReducer),
        StoreModule.forFeature('productDetail', productDetailReducer)
      ]
    })
    .overrideProvider(MatDialog, {useValue: dialog})
    .overrideProvider(MessageService, {useValue: messageService})
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    store = TestBed.inject(Store);
    location = TestBed.inject(Location);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  describe('given page starts', () => {

    it('then load products', done => {
      store.select('products').subscribe(state => {
        expect(state.isLoading).toBeTruthy();
        done();
      })
    });
  
    it('then load categories', done => {
      store.select('categories').subscribe(state => {
        expect(state.isLoading).toBeTruthy();
        done();
      })
    });

    it('then internal id filter should be empty', () => {
      expect(component.internalId).toEqual("");
    });

  })

  describe('given loading products', () => {

    it('then show products loader', () => {
      expect(page.querySelector('[test-id="products-loader"]')).not.toBeNull();
    });

    it('then hide products', () => {
      expect(page.querySelector('[test-id="products"]')).toBeNull();
    });

    it('then hide pagination button', () => {
      expect(page.querySelector('[test-id="pagination-button"]')).toBeNull();
    });

  })

  describe('given products loaded', () => {

    beforeEach(() => {
      dispatchLoadSuccess();
    })

    it('then hide products loader', () => {
      expect(page.querySelector('[test-id="products-loader"]')).toBeNull();
    });

    it('then show products', () => {
      expect(page.querySelector('[test-id="products"]')).not.toBeNull();
    });

    it('then show pagination button', () => {
      expect(page.querySelector('[test-id="pagination-button"]')).not.toBeNull();
    });

    it('when no more products to load, then hide pagination button', () => {
      dispatchLoadSuccess({amount: 2});

      expect(page.querySelector('[test-id="pagination-button"]')).toBeNull();
    });

    it('when products found, then hide no results message', () => {
      expect(page.querySelector('[test-id="no-results-found"]')).toBeNull();
    });

    it('when no products found, then show no results message', () => {
      dispatchLoadSuccess({amount: 0});

      expect(page.querySelector('[test-id="no-results-found"]')).not.toBeNull();
    });

    it('when click on product, then go to product page', done => {
      page.querySelectorAll('table tbody tr')[0].click();
      fixture.detectChanges();

      setTimeout(() => {
        expect(location.path()).toEqual('/products/1');
        done();
      }, 100)
    });

    it('when click on add product button, then go to add product page', done => {
      page.querySelector('[test-id="add-product-button"]').click();
      fixture.detectChanges();

      setTimeout(() => {
        expect(location.path()).toEqual('/products/new');
        done();
      }, 100)
    });

    it('when product visibility is true, then toggle should be true', () => {
      dispatchLoadSuccess({amount: 1, visibility: true});

      expect(page.querySelector('[test-id="visibility-toggle"] [aria-checked="true"]')).not.toBeNull();
    });

    it('when product visibility is false, then toggle should be false', () => {
      dispatchLoadSuccess({amount: 1, visibility: false});

      expect(page.querySelector('[test-id="visibility-toggle"] [aria-checked="false"]')).not.toBeNull();
    });

  })

  describe('given user clicks to remove product', () => {

    beforeEach(() => {
      dispatchLoadSuccess();
    })

    it('then show confirm dialog', () => {
      page.querySelectorAll('[test-id="remove-product-button"]')[0].click();
      fixture.detectChanges();

      expect(dialog.hasOpened).toBeTruthy();
    })

    describe('when user confirms removal', () => {

      beforeEach(() => {
        dialog.response = "YES";
  
        page.querySelectorAll('[test-id="remove-product-button"]')[0].click();
        fixture.detectChanges();
      })

      it('then show loading', () => {
        expect(page.querySelector('[test-id="products-loader"]')).not.toBeNull();
      })

      it('then remove', done => {
        store.select('products').subscribe(state => {
          expect(state.isRemoving).toBeTruthy();
          done();
        })
      })

      it('and category removed with success, then hide loading', () => {
        store.dispatch(removeSuccess());
        fixture.detectChanges();
  
        expect(page.querySelector('[test-id="products-loader"]')).toBeNull();
      })

      describe('and category removed with error', () => {

        beforeEach(() => {
          store.dispatch(removeFail({error: "error"}));
          fixture.detectChanges();
        })

        it('then hide loading', () => {
          expect(page.querySelector('[test-id="products-loader"]')).toBeNull();
        })
  
        it('and product removed with error, then show error', () => {
          expect(messageService._hasShownError).toBeTruthy();
        })

      })

    })

    it('when user cancels removal, then do not remove', done => {
      dialog.response = null;

      page.querySelectorAll('[test-id="remove-product-button"]')[0].click();
      fixture.detectChanges();

      store.select('categories').subscribe(state => {
        expect(state.isRemoving).toBeFalsy();
        done();
      })
    })

  })

  describe('given user clicks on pagination button', () => {

    beforeEach(() => {
      dispatchLoadSuccess()

      page.querySelector('[test-id="pagination-button"]').click();
      fixture.detectChanges();
    })

    it('then load more products', done => {
      store.select('products').subscribe(state => {
        expect(state.page).toEqual(1);
        done();
      })
    })

    describe('when loading more products', () => {

      it('then hide pagination button', () => {
        expect(page.querySelector('[test-id="pagination-button"]')).toBeNull();
      })

      it('then show pagination loader', () => {
        expect(page.querySelector('[test-id="pagination-loader"]')).not.toBeNull();
      })

    })

  })

  describe('given user clicks to filter products', () => {

    beforeEach(() => {
      dispatchLoadSuccess();

      page.querySelector('[test-id="button-filter"] [test-id="button"]').click();
      fixture.detectChanges();
    })

    it('then load products', done => {
      store.select('products').subscribe(state => {
        expect(state.isLoading).toBeTruthy();
        done();
      })
    })

  })

  describe('given user changes product visibility', () => {

    beforeEach(() => {
      dispatchLoadSuccess({amount: 3, visibility: true});

      component.toggleVisibility({id: 1} as any);
      fixture.detectChanges();
    })

    it('then change product visibility', done => {
      store.select('productDetail').subscribe(state => {
        expect(state.isChangingVisibility).toBeTruthy();
        done();
      })
    })

    it('then show visibility loader', () => {
      expect(page.querySelectorAll('[test-id="visibility-loader"]')).not.toBeNull();
    })

    it('then disable other toggles', () => {
      expect(
        page.querySelectorAll('[test-id="visibility-toggle"][ng-reflect-disabled="true"]').length
      ).toEqual(2);
    })

    describe('when visibility changed with success', () => {

      beforeEach(() => {
        store.dispatch(changeVisibilitySuccess({id: "1"}));
        fixture.detectChanges();
      })

      it('then hide visibility loader', () => {
        expect(page.querySelector('[test-id="visibility-loader"]')).toBeNull();
      })

      it('then enable toggles', () => {
        expect(
          page.querySelectorAll('[test-id="visibility-toggle"][ng-reflect-disabled="false"]').length
        ).toEqual(3);
      })

    })

    describe('when visibility changed with error', () => {

      beforeEach(() => {
        const error = {message: "error"};
        store.dispatch(changeVisibilityFail({error}));
        fixture.detectChanges();
      })

      it('then show error', () => {
        expect(messageService._hasShownError).toBeTruthy();
      })

      it('then hide visibility loader', () => {
        expect(page.querySelector('[test-id="visibility-loader"]')).toBeNull();
      })

      it('then change visibility back to previous state', () => {
        expect(
          page.querySelectorAll('[test-id="visibility-toggle"][ng-reflect-disabled="false"]').length
        ).toEqual(3);
      })

    })

  })

  function dispatchLoadSuccess(
    {amount = 30, visibility = true}: {amount: number, visibility?: boolean} = {amount: 30, visibility: true}
  ) {
    const products = Array.from(Array(amount).keys())
      .map((v, index) => ({id: index+1, isVisible: visibility})) as any;
    store.dispatch(loadSuccess({products}));
    fixture.detectChanges();
  }

});
