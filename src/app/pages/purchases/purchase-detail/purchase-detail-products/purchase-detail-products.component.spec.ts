import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { MatDialogMock } from 'src/mock/mat-dialog.mock';
import { PageMock } from 'src/mock/page.mock';
import { loadPurchaseDetailSuccess } from '../store/purchase-detail.actions';
import { purchaseDetailReducer } from '../store/purchase-detail.reducers';
import { PurchaseDetailProductsComponent } from './purchase-detail-products.component';

describe('PurchaseDetailProductsComponent', () => {
  let component: PurchaseDetailProductsComponent;
  let fixture: ComponentFixture<PurchaseDetailProductsComponent>;
  let page: PageMock;
  let store: Store<AppState>;
  let dialog: MatDialogMock;

  beforeEach(async () => {
    dialog = new MatDialogMock();

    await TestBed.configureTestingModule({
      declarations: [ PurchaseDetailProductsComponent ],
      imports: [
        StoreModule.forRoot([]),
        StoreModule.forFeature('purchaseDetail', purchaseDetailReducer)
      ]
    })
    .overrideProvider(MatDialog, {useValue: dialog})
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseDetailProductsComponent);
    store = TestBed.inject(Store);
    
    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
    
    const purchase = {products: [{id: "anyProductId"}]} as any;
    store.dispatch(loadPurchaseDetailSuccess({purchase}));

    fixture.detectChanges();
  });

  describe('given purchase', () => {

    it('then show edit button', () => {
      expect(page.querySelector('[test-id="edit-product"]')).not.toBeNull();
    });

    it('when user clicks on edit purchase product, then show purchase product details', () => {
      page.querySelector('[test-id="edit-product"]').click();
      fixture.detectChanges();

      expect(dialog.hasOpened).toBeTruthy();
    });

  });

});
