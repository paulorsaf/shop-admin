import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { BlankComponent } from 'src/mock/blank-component/blank.component.mock';
import { PageMock } from 'src/mock/page.mock';
import { PurchasesComponent } from './purchases.component';
import { PurchasesModule } from './purchases.module';
import { loadPurchasesSuccess } from './store/purchases.actions';
import { purchasesReducer } from './store/purchases.reducers';

describe('PurchasesComponent', () => {
  let component: PurchasesComponent;
  let fixture: ComponentFixture<PurchasesComponent>;
  let page: PageMock;
  let store: Store<AppState>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'purchases/:uid', component: BlankComponent }
        ]),
        PurchasesModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('purchases', purchasesReducer)
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasesComponent);
    store = TestBed.inject(Store);
    location = TestBed.inject(Location);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('given page starts, then load purchases', done => {
    store.select('purchases').subscribe(state => {
      expect(state.isLoading).toBeTruthy();
      done();
    })
  });

  describe('given loading purchases', () => {

    it('then show purchases loader', () => {
      expect(page.querySelector('[test-id="purchases-loader"]')).not.toBeNull();
    });

    it('then hide purchases', () => {
      expect(page.querySelector('[test-id="purchases"]')).toBeNull();
    });

    it('then hide print button', () => {
      expect(page.querySelector('[test-id="print-purchases-button"]')).toBeNull();
    })
    
  });

  describe('given purchases loaded', () => {

    beforeEach(() => {
      const purchases = [{id: 1}] as any;
      store.dispatch(loadPurchasesSuccess({purchases}));
      fixture.detectChanges();
    })

    it('then hide purchases loader', () => {
      expect(page.querySelector('[test-id="purchases-loader"]')).toBeNull();
    });

    it('then show purchases', () => {
      expect(page.querySelector('[test-id="purchases"]')).not.toBeNull();
    });

    it('then show print button', () => {
      expect(page.querySelector('[test-id="print-purchases-button"]')).not.toBeNull();
    })

    it('when purchases found, then hide no results found message', () => {
      expect(page.querySelector('[test-id="no-results-found"]')).toBeNull();
    });

    describe('when no purchases found', () => {

      beforeEach(() => {
        const purchases = [] as any;
        store.dispatch(loadPurchasesSuccess({purchases}));
        fixture.detectChanges();
      })

      it('then show no results found message', () => {
        expect(page.querySelector('[test-id="no-results-found"]')).not.toBeNull();
      });

      it('then hide print button', () => {
        expect(page.querySelector('[test-id="print-purchases-button"]')).toBeNull();
      })

    })

    it('when purchase payment doesnt have error, then hide payment error', () => {
      const purchases = [{payment: {}}] as any;
      store.dispatch(loadPurchasesSuccess({purchases}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="payment-error"]')).toBeNull();
    });

    it('when purchase payment has error, then show payment error', () => {
      const purchases = [{payment: {error: "any error"}}] as any;
      store.dispatch(loadPurchasesSuccess({purchases}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="payment-error"]')).not.toBeNull();
    });

    it('when purchase payment is pix, then show receipt', () => {
      const purchases = [{payment: {receiptUrl: "anyReceiptUrl", type: "PIX"}}] as any;
      store.dispatch(loadPurchasesSuccess({purchases}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="pix-receipt"]')).not.toBeNull();
    });

    it('when purchase payment is not pix, then hide receipt', () => {
      const purchases = [{payment: {type: "ANY"}}] as any;
      store.dispatch(loadPurchasesSuccess({purchases}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="pix-receipt"]')).toBeNull();
    });

    it('when user clicks on purchase, then go to purchase details page', done => {
      page.querySelectorAll('table tbody tr')[0].click();
      fixture.detectChanges();
  
      setTimeout(() => {
        expect(location.path()).toEqual('/purchases/1');
        done();
      }, 100)
    })

    it('when user clicks on print purchase, then print purchase', done => {
      page.querySelector('[test-id="print-purchase"]').click();
      fixture.detectChanges();
  
      store.select('purchases').subscribe(state => {
        expect(state.isPrinting).toBeTruthy();
        done();
      })
    })

    it('when user clicks on print purchases button, then print purchases', done => {
      page.querySelector('[test-id="print-purchases-button"]').click();
      fixture.detectChanges();

      store.select('purchases').subscribe(state => {
        expect(state.isPrintingAll).toBeTruthy();
        done();
      })
    })
    
  });

});
