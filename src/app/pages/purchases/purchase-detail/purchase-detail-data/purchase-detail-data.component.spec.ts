import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { loadUserCompanySuccess } from 'src/app/store/user/user.actions';
import { userReducer } from 'src/app/store/user/user.reducers';
import { MatDialogMock } from 'src/mock/mat-dialog.mock';
import { PageMock } from 'src/mock/page.mock';
import { PurchasesModule } from '../../purchases.module';
import { purchasesReducer } from '../../store/purchases.reducers';
import { loadPurchaseDetailSuccess, sendPurchaseToSystem, sendPurchaseToSystemFail, sendPurchaseToSystemSuccess } from '../store/purchase-detail.actions';
import { purchaseDetailReducer } from '../store/purchase-detail.reducers';
import { PurchaseDetailDataComponent } from './purchase-detail-data.component';

describe('PurchaseDetailDataComponent', () => {
  let component: PurchaseDetailDataComponent;
  let fixture: ComponentFixture<PurchaseDetailDataComponent>;
  let dialog: MatDialogMock;
  let store: Store<AppState>;
  let page: PageMock;

  beforeEach(async () => {
    dialog = new MatDialogMock();

    await TestBed.configureTestingModule({
      declarations: [ PurchaseDetailDataComponent ],
      imports: [
        BrowserAnimationsModule,
        PurchasesModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('purchaseDetail', purchaseDetailReducer),
        StoreModule.forFeature('purchases', purchasesReducer),
        StoreModule.forFeature('user', userReducer)
      ]
    })
    .overrideProvider(MatDialog, {useValue: dialog})
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseDetailDataComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    const company = {
      payment: {isPaymentAfterPurchase: false},
      hasToSendPurchaseToOwnSystem: false
    } as any;
    store.dispatch(loadUserCompanySuccess({company}));
    fixture.detectChanges();
  });
  
  describe('given purchase detail loaded', () => {

    beforeEach(() => {
      const purchase = {id: 1} as any;
      store.dispatch(loadPurchaseDetailSuccess({purchase}));
      fixture.detectChanges();
    })

    it('when user clicks on print button, then print purchase', done => {
      page.querySelector('[test-id="print-purchase"]').click();

      store.select('purchases').subscribe(state => {
        expect(state.isPrinting).toBeTruthy();
        done();
      })
    })

    describe('when purchase detail payment is pix', () => {

      beforeEach(() => {
        const purchase = {id: 1, payment: {type: "PIX", receiptUrl: "receiptUrl"}} as any;
        store.dispatch(loadPurchaseDetailSuccess({purchase}));
        fixture.detectChanges();
      })

      it('then show receipt', () => {
        expect(page.querySelector('[test-id="receipt"]')).not.toBeNull();
      })

      it('and user clicks on receipt, then show receipt file', () => {
        spyOn(window, 'open');
        
        page.querySelector('[test-id="receipt"]').click();
        fixture.detectChanges();

        expect(window.open).toHaveBeenCalled();
      })

    })

    describe('when purchase detail payment is not pix', () => {

      beforeEach(() => {
        const purchase = {id: 1, payment: {type: "ANY_OTHER"}} as any;
        store.dispatch(loadPurchaseDetailSuccess({purchase}));
        fixture.detectChanges();
      })

      it('then hide receipt', () => {
        expect(page.querySelector('[test-id="receipt"]')).toBeNull();
      })

    })

    describe('when purchase detail payment has an error', () => {

      beforeEach(() => {
        const purchase = {id: 1, payment: {error: "anyError"}} as any;
        store.dispatch(loadPurchaseDetailSuccess({purchase}));
        fixture.detectChanges();
      })

      it('then show payment error', () => {
        expect(page.querySelector('[test-id="payment-error"]')).not.toBeNull();
      })

    })

    describe('when purchase detail payment doesnt have an error', () => {

      beforeEach(() => {
        const purchase = {id: 1, payment: {}} as any;
        store.dispatch(loadPurchaseDetailSuccess({purchase}));
        fixture.detectChanges();
      })

      it('then hide payment error', () => {
        expect(page.querySelector('[test-id="payment-error"]')).toBeNull();
      })

    })

    describe('when user changes purchase status', () => {

      beforeEach(() => {
        fixture.detectChanges();

        const purchase = {status: "anyStatus"} as any;
        store.dispatch(loadPurchaseDetailSuccess({purchase}));
        fixture.detectChanges();

        component.status = "anyOtherStatus";
      })

      it('then ask for user confirmation', done => {
        component.changeStatus();
        fixture.detectChanges();

        setTimeout(() => {
          expect(dialog.hasOpened).toBeTruthy();
          done();
        }, 100)
      })

      it('when user cancels status change, then dont change status', () => {
        component.changeStatus();
        fixture.detectChanges();

        expect(component.status).toEqual("anyStatus");
      })

      it('when user confirms status change, then change status', done => {
        dialog.response = "YES";
        
        component.changeStatus();
        fixture.detectChanges();

        store.select('purchaseDetail').subscribe(state => {
          expect(state.isUpdating).toBeTruthy();
          done();
        })
      })

    })

  })

  describe('Status list', () => {

    describe('given payment is before purchase', () => {
  
      it('when payment is by pix, then set status list', () => {
        const purchase = {id: 1, payment: {type: "PIX"}} as any;
        store.dispatch(loadPurchaseDetailSuccess({purchase}));
        fixture.detectChanges();
  
        expect(component.statusList.map(s => s.key)).toEqual([
          "CREATED", "VERIFYING_PAYMENT", "PAID", "SORTING_OUT", "READY", "FINISHED", "CANCELLED"
        ]);
      })
  
      it('when payment is by money, then set status list', () => {
        const purchase = {id: 1, payment: {type: "MONEY"}} as any;
        store.dispatch(loadPurchaseDetailSuccess({purchase}));
        fixture.detectChanges();
  
        expect(component.statusList.map(s => s.key)).toEqual([
          "CREATED", "SORTING_OUT", "READY", "FINISHED", "CANCELLED"
        ]);
      })
  
    })

    describe('given payment is after purchase', () => {

      beforeEach(() => {
        const company = {payment: {isPaymentAfterPurchase: true}} as any;
        store.dispatch(loadUserCompanySuccess({company}));
      })
  
      it('then set status list', () => {
        const purchase = {id: 1, payment: {type: "PIX"}} as any;
        store.dispatch(loadPurchaseDetailSuccess({purchase}));
        fixture.detectChanges();
  
        expect(component.statusList.map(s => s.key)).toEqual([
          "CREATED", "SORTING_OUT", "WAITING_PAYMENT", "VERIFYING_PAYMENT", "PAID", "READY", "FINISHED", "CANCELLED"
        ]);
      })
  
    })
  
    it('when purchase has address, then add DELIVERYING to status list', () => {
      const purchase = {id: 1, address: {}} as any;
      store.dispatch(loadPurchaseDetailSuccess({purchase}));
      fixture.detectChanges();

      expect(component.statusList.some(s => s.key === "DELIVERYING")).toBeTruthy();
    })

  })

  describe('given company has own company system', () => {

    beforeEach(() => {
      const company = {hasToSendPurchaseToOwnSystem: true, payment: {}} as any;
      store.dispatch(loadUserCompanySuccess({company}));
      fixture.detectChanges();

      const purchase = {id: 1, address: {}} as any;
      store.dispatch(loadPurchaseDetailSuccess({purchase}));
      fixture.detectChanges();
    })

    it('then show button to send purchase to system', () => {
      expect(page.querySelector('[test-id="send-to-company-system"]')).not.toBeNull();
    })

    it('when purchase has already been sent to system, then hide send purchase button', () => {
      const purchase = {id: 1, address: {}, hasBeenSentToSystem: true} as any;
      store.dispatch(loadPurchaseDetailSuccess({purchase}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="send-to-company-system"]')).toBeNull();
    })

    describe('when user clicks on button', () => {

      it('then show confirm alert', () => {
        page.querySelector('[test-id="send-to-company-system"]').click();
        fixture.detectChanges();

        expect(dialog.hasOpened).toBeTruthy();
      })

      it('and confirms, then send purchase to system', done => {
        dialog.response = 'YES';
        page.querySelector('[test-id="send-to-company-system"]').click();
        fixture.detectChanges();

        store.select('purchaseDetail').subscribe(state => {
          expect(state.isSendingToSystem).toBeTruthy();
          done();
        })
      })

      it('and cancels, then do not send purchase to system', done => {
        page.querySelector('[test-id="send-to-company-system"]').click();
        fixture.detectChanges();

        store.select('purchaseDetail').subscribe(state => {
          expect(state.isSendingToSystem).toBeFalsy();
          done();
        })
      })

    })

    describe('when sending purchase to system', () => {

      beforeEach(() => {
        store.dispatch(sendPurchaseToSystem());
        fixture.detectChanges();
      })

      it('then hide send purchase button', () => {
        expect(page.querySelector('[test-id="send-to-company-system"]')).toBeNull();
      })

      it('then show loading', () => {
        expect(page.querySelector('[test-id="sending-to-company-system"]')).not.toBeNull();
      })

    })

    describe('when purchase sent to system', () => {

      beforeEach(() => {
        store.dispatch(sendPurchaseToSystemSuccess());
        fixture.detectChanges();
      })

      it('then hide loading', () => {
        expect(page.querySelector('[test-id="sending-to-company-system"]')).toBeNull();
      })

    })

    describe('when error on send purchase to system', () => {

      beforeEach(() => {
        const error = {error: "error"};
        store.dispatch(sendPurchaseToSystemFail({error}));
        fixture.detectChanges();
      })

      it('then hide loading', () => {
        expect(page.querySelector('[test-id="sending-to-company-system"]')).toBeNull();
      })

    })

  })

  it('given company doesnt have own company system, then hide button to send purchase to system', () => {
    const purchase = {id: 1, address: {}} as any;
    store.dispatch(loadPurchaseDetailSuccess({purchase}));
    fixture.detectChanges();

    expect(page.querySelector('[test-id="send-to-company-system"]')).toBeNull();
  })

});
