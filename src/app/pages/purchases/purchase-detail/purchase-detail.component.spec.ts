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
import { loadPurchaseDetailFail, loadPurchaseDetailSuccess } from './store/purchase-detail.actions';
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
