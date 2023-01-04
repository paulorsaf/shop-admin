import { DialogModule } from '@angular/cdk/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { MatDialogRefMock } from 'src/mock/mat-dialog.mock';
import { PageMock } from 'src/mock/page.mock';
import { cancelPurchaseProductSuccess } from '../store/purchase-detail.actions';
import { purchaseDetailReducer } from '../store/purchase-detail.reducers';
import { PurchaseDetailCancelProductComponent } from './purchase-detail-cancel-product.component';

describe('PurchaseDetailCancelProductComponent', () => {
  let component: PurchaseDetailCancelProductComponent;
  let fixture: ComponentFixture<PurchaseDetailCancelProductComponent>;
  let page: PageMock;
  let dialogRef: MatDialogRefMock;
  let store: Store<AppState>;

  beforeEach(async () => {
    dialogRef = new MatDialogRefMock();

    await TestBed.configureTestingModule({
      declarations: [ PurchaseDetailCancelProductComponent ],
      imports: [
        ReactiveFormsModule,
        DialogModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('purchaseDetail', purchaseDetailReducer)
      ]
    })
    .overrideProvider(MatDialogRef, {useValue: dialogRef})
    .overrideProvider(MAT_DIALOG_DATA, {useValue: {}})
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseDetailCancelProductComponent);
    store = TestBed.inject(Store);
    
    component = fixture.componentInstance;
    component.product = { amount: 1, unit: "UN", stock: {id: "anyStockId"} } as any;
    
    page = fixture.debugElement.nativeElement;
    
    fixture.detectChanges();
  });

  it('given user clicks on close button, then close dialog', () => {
    page.querySelector('[test-id="close-button"]').click();
    fixture.detectChanges();

    expect(dialogRef.hasClosed).toBeTruthy();
  })

  describe('given user clicks to cancel product purchase', () => {

    beforeEach(() => {
      page.querySelector('[test-id="cancel-button"]').click();
      fixture.detectChanges();
    });

    it('then cancel product purchase', done => {
      store.select('purchaseDetail').subscribe(state => {
        expect(state.isCancelingProduct).toBeTruthy();
        done();
      })
    })

    describe('when canceling product purchase', () => {

      it('then hide cancel button', () => {
        expect(page.querySelector('[test-id="cancel-button"]')).toBeNull();
      })

      it('then show loading', () => {
        expect(page.querySelector('[test-id="loading-button"]')).not.toBeNull();
      })

    })

    describe('when product purchase cancelled', () => {

      beforeEach(() => {
        store.dispatch(cancelPurchaseProductSuccess());
        fixture.detectChanges();
      })

      it('then close dialog', () => {
        expect(dialogRef.hasClosed).toBeTruthy();
      })

    })

  });

});
