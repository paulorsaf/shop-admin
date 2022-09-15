import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { MatDialogMock } from 'src/mock/mat-dialog.mock';
import { MessageServiceMock } from 'src/mock/message-service.mock';
import { PageMock } from 'src/mock/page.mock';
import { PurchasesModule } from '../../purchases.module';
import { loadPurchaseDetailSuccess } from '../store/purchase-detail.actions';
import { purchaseDetailReducer } from '../store/purchase-detail.reducers';
import { PurchaseDetailDataComponent } from './purchase-detail-data.component';

describe('PurchaseDetailDataComponent', () => {
  let component: PurchaseDetailDataComponent;
  let fixture: ComponentFixture<PurchaseDetailDataComponent>;
  let dialog: MatDialogMock;
  let store: Store<AppState>;
  let page: PageMock;
  let messageService: MessageServiceMock;

  beforeEach(async () => {
    dialog = new MatDialogMock();
    messageService = new MessageServiceMock();

    await TestBed.configureTestingModule({
      declarations: [ PurchaseDetailDataComponent ],
      imports: [
        BrowserAnimationsModule,
        PurchasesModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('purchaseDetail', purchaseDetailReducer)
      ]
    })
    .overrideProvider(MatDialog, {useValue: dialog})
    .overrideProvider(MessageService, {useValue: messageService})
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseDetailDataComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });
  
  describe('given purchase detail loaded', () => {

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

      it('then set status list', () => {
        expect(component.statusList.map(s => s.key)).toEqual([
          "CREATED", "VERIFYING_PAYMENT", "PAID", "SORTING_OUT", "READY", "FINISHED", "CANCELLED"
        ]);
      })

    })

    describe('when purchase payment is by money', () => {

      beforeEach(() => {
        const purchase = {id: 1, payment: {type: "MONEY"}} as any;
        store.dispatch(loadPurchaseDetailSuccess({purchase}));
        fixture.detectChanges();
      })

      it('then set status list', () => {
        expect(component.statusList.map(s => s.key)).toEqual([
          "CREATED", "SORTING_OUT", "READY", "FINISHED", "CANCELLED"
        ]);
      })

    })

    it('when purchase has address, then add DELIVERYING to status list', () => {
      const purchase = {id: 1, payment: {type: "MONEY"}, address: {}} as any;
      store.dispatch(loadPurchaseDetailSuccess({purchase}));
      fixture.detectChanges();

      expect(component.statusList.some(s => s.key === "DELIVERYING")).toBeTruthy();
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

});
