import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { ActivatedRouteMock } from 'src/mock/activated-route.mock';
import { MatDialogMock } from 'src/mock/mat-dialog.mock';
import { MessageServiceMock } from 'src/mock/message-service.mock';
import { PageMock } from 'src/mock/page.mock';
import { PurchasesModule } from '../purchases.module';
import { PurchaseDetailComponent } from './purchase-detail.component';
import { loadPurchaseDetailFail, loadPurchaseDetailSuccess, updatePurchaseStatusFail, updatePurchaseStatusSuccess } from './store/purchase-detail.actions';
import { purchaseDetailReducer } from './store/purchase-detail.reducers';

describe('PurchaseDetailComponent', () => {
  let component: PurchaseDetailComponent;
  let fixture: ComponentFixture<PurchaseDetailComponent>;
  let page: PageMock;
  let store: Store<AppState>;
  let activatedRoute: ActivatedRouteMock;
  let messageService: MessageServiceMock;
  let dialog: MatDialogMock;

  beforeEach(async () => {
    activatedRoute = new ActivatedRouteMock();
    dialog = new MatDialogMock();
    messageService = new MessageServiceMock();

    await TestBed.configureTestingModule({
      declarations: [ PurchaseDetailComponent ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
        PurchasesModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('purchaseDetail', purchaseDetailReducer)
      ]
    })
    .overrideProvider(ActivatedRoute, {useValue: activatedRoute})
    .overrideProvider(MatDialog, {useValue: dialog})
    .overrideProvider(MessageService, {useValue: messageService})
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseDetailComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  
    activatedRoute.value = '1';

    fixture.detectChanges();
  });

  it('given page starts, then load purchase details', done => {
    store.select('purchaseDetail').subscribe(state => {
      expect(state.isLoading).toBeTruthy();
      done();
    })
  });

  describe('given loading purchase detail', () => {

    it('then show loader', () => {
      expect(page.querySelector('[test-id="purchase-detail-loader"]')).not.toBeNull();
    })

    it('then hide purchase detail', () => {
      expect(page.querySelector('[test-id="purchase-detail"]')).toBeNull();
    })

  })

  describe('given purchase detail loaded', () => {

    it('then hide loader', () => {
      const purchase = {id: 1} as any;
      store.dispatch(loadPurchaseDetailSuccess({purchase}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="purchase-detail-loader"]')).toBeNull();
    })

    it('then show purchase detail', () => {
      const purchase = {id: 1} as any;
      store.dispatch(loadPurchaseDetailSuccess({purchase}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="purchase-detail"]')).not.toBeNull();
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

      it('then set status list', () => {
        expect(component.statusList.map(s => s.key)).toEqual([
          "CREATED", "VERIFYING_PAYMENT", "PAID", "SORTING_OUT", "READY", "FINISHED"
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
          "CREATED", "SORTING_OUT", "READY", "FINISHED"
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

      it('then show error', () => {
        expect(page.querySelector('[test-id="payment-error"]')).not.toBeNull();
      })

    })

    describe('when purchase detail payment doesnt have an error', () => {

      beforeEach(() => {
        const purchase = {id: 1, payment: {}} as any;
        store.dispatch(loadPurchaseDetailSuccess({purchase}));
        fixture.detectChanges();
      })

      it('then hide error', () => {
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

      describe('when updating status', () => {

        beforeEach(() => {
          dialog.response = "YES";
          
          component.changeStatus();
          fixture.detectChanges();
        })

        it('then show purchase detail loader', () => {
          expect(page.querySelector('[test-id="purchase-detail-loader"]')).not.toBeNull();
        })

        it('then hide purchase detail', () => {
          expect(page.querySelector('[test-id="purchase-detail"]')).toBeNull();
        })

      })

      describe('when status updated', () => {

        beforeEach(() => {
          dialog.response = "YES";
          
          component.changeStatus();
          fixture.detectChanges();

          store.dispatch(updatePurchaseStatusSuccess());
          fixture.detectChanges();
        })

        it('then hide purchase detail loader', () => {
          expect(page.querySelector('[test-id="purchase-detail-loader"]')).toBeNull();
        })

        it('then show purchase detail', () => {
          expect(page.querySelector('[test-id="purchase-detail"]')).not.toBeNull();
        })

        it('then show success message', () => {
          expect(messageService._hasShownSuccess).toBeTruthy();
        })

      })

      describe('when error on status update', () => {

        beforeEach(() => {
          dialog.response = "YES";
          
          component.changeStatus();
          fixture.detectChanges();

          const error = {error: 'error'}
          store.dispatch(updatePurchaseStatusFail({error}));
          fixture.detectChanges();
        })

        it('then hide purchase detail loader', () => {
          expect(page.querySelector('[test-id="purchase-detail-loader"]')).toBeNull();
        })

        it('then show purchase detail', () => {
          expect(page.querySelector('[test-id="purchase-detail"]')).not.toBeNull();
        })

        it('then show error', () => {
          expect(messageService._hasShownError).toBeTruthy();
        })

      })

    })

  })

  describe('given error on loading purchase detail', () => {

    beforeEach(() => {
      const error = {id: 1} as any;
      store.dispatch(loadPurchaseDetailFail({error}));
      fixture.detectChanges();
    })

    it('then hide loader', () => {
      expect(page.querySelector('[test-id="purchase-detail-loader"]')).toBeNull();
    })

    it('then show error message', () => {
      expect(messageService._hasShownError).toBeTruthy();
    })

  })

});
