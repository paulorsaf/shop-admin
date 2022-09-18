import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { PageMock } from 'src/mock/page.mock';
import { PurchasesModule } from '../../purchases.module';
import { loadPurchaseDetailSuccess } from '../store/purchase-detail.actions';
import { purchaseDetailReducer } from '../store/purchase-detail.reducers';
import { PurchaseDetailProductNotesComponent } from './purchase-detail-product-notes.component';

describe('PurchaseDetailProductNotesComponent', () => {
  let component: PurchaseDetailProductNotesComponent;
  let fixture: ComponentFixture<PurchaseDetailProductNotesComponent>;
  let page: PageMock;
  let store: Store<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PurchaseDetailProductNotesComponent
      ],
      imports: [
        PurchasesModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('purchaseDetail', purchaseDetailReducer)
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseDetailProductNotesComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  describe('given purchase has product notes', () => {

    beforeEach(() => {
      const purchase = {id: 1, productNotes: [{id: "anyProductId"}]} as any;
      store.dispatch(loadPurchaseDetailSuccess({purchase}));
      fixture.detectChanges();
    })

    it('then show product notes', () => {
      expect(page.querySelector('[test-id="product-notes"]')).not.toBeNull();;
    });

    it('then hide empty results', () => {
      expect(page.querySelector('[test-id="empty-results"]')).toBeNull();;
    });

  })

  describe('given purchase doesnt have product notes', () => {

    beforeEach(() => {
      const purchase = {id: 1} as any;
      store.dispatch(loadPurchaseDetailSuccess({purchase}));
      fixture.detectChanges();
    })

    it('then hide product notes', () => {
      expect(page.querySelector('[test-id="product-notes"]')).toBeNull();;
    });

    it('then show empty results', () => {
      expect(page.querySelector('[test-id="empty-results"]')).not.toBeNull();;
    });

  })

});
