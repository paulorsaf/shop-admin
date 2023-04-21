import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
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
        StoreModule.forRoot([]),
        StoreModule.forFeature('categories', categoriesReducer),
        StoreModule.forFeature('products', productsReducer)
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
      dispatchLoadSuccess(2);

      expect(page.querySelector('[test-id="pagination-button"]')).toBeNull();
    });

    it('when products found, then hide no results message', () => {
      expect(page.querySelector('[test-id="no-results-found"]')).toBeNull();
    });

    it('when no products found, then show no results message', () => {
      dispatchLoadSuccess(0);

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

  function dispatchLoadSuccess(amount = 30) {
    const products = Array.from(Array(amount).keys()).map((v, index) => ({id: index+1})) as any;
    store.dispatch(loadSuccess({products}));
    fixture.detectChanges();
  }

});
