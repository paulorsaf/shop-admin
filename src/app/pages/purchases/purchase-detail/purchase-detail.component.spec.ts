import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { ActivatedRouteMock } from 'src/mock/activated-route.mock';
import { MessageServiceMock } from 'src/mock/message-service.mock';
import { PageMock } from 'src/mock/page.mock';
import { PurchasesModule } from '../purchases.module';
import { PurchaseDetailComponent } from './purchase-detail.component';
import { loadPurchaseDetailFail, loadPurchaseDetailSuccess } from './store/purchase-detail.actions';
import { purchaseDetailReducer } from './store/purchase-detail.reducers';

fdescribe('PurchaseDetailComponent', () => {
  let component: PurchaseDetailComponent;
  let fixture: ComponentFixture<PurchaseDetailComponent>;
  let page: PageMock;
  let store: Store<AppState>;
  let activatedRoute: ActivatedRouteMock;
  let messageService: MessageServiceMock;

  beforeEach(async () => {
    activatedRoute = new ActivatedRouteMock();
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

    beforeEach(() => {
      const purchase = {id: 1} as any;
      store.dispatch(loadPurchaseDetailSuccess({purchase}));
      fixture.detectChanges();
    })

    it('then hide loader', () => {
      expect(page.querySelector('[test-id="purchase-detail-loader"]')).toBeNull();
    })

    it('then show purchase detail', () => {
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

    })

    describe('when purchase detail payment is not pix', () => {

      beforeEach(() => {
        const purchase = {id: 1, payment: {type: "MONEY"}} as any;
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

      xit('then ask for user confirmation', () => {
        expect(false).toBeTruthy();
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
