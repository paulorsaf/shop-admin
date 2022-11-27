import { DialogModule } from '@angular/cdk/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { MatDialogRefMock } from 'src/mock/mat-dialog.mock';
import { PageMock } from 'src/mock/page.mock';
import { editPurchaseProductSuccess } from '../store/purchase-detail.actions';
import { purchaseDetailReducer } from '../store/purchase-detail.reducers';
import { PurchaseDetailEditProductComponent } from './purchase-detail-edit-product.component';

describe('PurchaseDetailEditProductComponent', () => {
  let component: PurchaseDetailEditProductComponent;
  let fixture: ComponentFixture<PurchaseDetailEditProductComponent>;
  let page: PageMock;
  let dialogRef: MatDialogRefMock;
  let store: Store<AppState>;

  beforeEach(async () => {
    dialogRef = new MatDialogRefMock();

    await TestBed.configureTestingModule({
      declarations: [ PurchaseDetailEditProductComponent ],
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

    fixture = TestBed.createComponent(PurchaseDetailEditProductComponent);
    store = TestBed.inject(Store);
    
    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  });

  describe('given product unit is UN', () => {

    beforeEach(() => {
      component.product = { amount: 1, unit: "UN", stock: {id: "anyStockId"} } as any;
      fixture.detectChanges();
    })

    it('then show product amount field', () => {
      expect(page.querySelector('[test-id="amount"]')).not.toBeNull();
    })

    it('then hide product weight field', () => {
      expect(page.querySelector('[test-id="weight"]')).toBeNull();
    })

    it('when amount is empty, then save button should be disabled', () => {
      component.form.get('amount')?.setValue("");
      fixture.detectChanges();

      expect(page.querySelector('[test-id="save-button"]').disabled).toBeTruthy();
    })

    it('when amount is not empty, then save button should be enabled', () => {
      component.form.get('amount')?.setValue("anyValue");
      fixture.detectChanges();

      expect(page.querySelector('[test-id="save-button"]').disabled).toBeFalsy();
    })

  })

  describe('given product unit is KG', () => {

    beforeEach(() => {
      component.product = { amount: 1, unit: "KG", stock: {id: "anyStockId"} } as any;
      fixture.detectChanges();
    })

    it('then hide product amount field', () => {
      expect(page.querySelector('[test-id="amount"]')).toBeNull();
    })

    it('then show product weight field', () => {
      expect(page.querySelector('[test-id="weight"]')).not.toBeNull();
    })

    it('when weight is empty, then save button should be disabled', () => {
      component.form.get('weight')?.setValue("");
      fixture.detectChanges();

      expect(page.querySelector('[test-id="save-button"]').disabled).toBeTruthy();
    })

    it('when weight is not empty, then save button should be enabled', () => {
      component.form.get('weight')?.setValue("anyValue");
      fixture.detectChanges();

      expect(page.querySelector('[test-id="save-button"]').disabled).toBeFalsy();
    })

  })

  it('given user clicks on cancel button, then close page', () => {
    component.product = { amount: 1, unit: "UN" } as any;
    fixture.detectChanges();

    page.querySelector('[test-id="cancel-button"]').click();
    fixture.detectChanges();

    expect(dialogRef.hasClosed).toBeTruthy();
  })

  describe('given user clicks on save button', () => {

    beforeEach(() => {
      component.product = { amount: 1, unit: "UN", stock: {id: "anyStockId"} } as any;
      fixture.detectChanges();

      page.querySelector('[test-id="save-button"]').click();
      fixture.detectChanges();
    })

    it('then edit purchase product', done => {
      store.select('purchaseDetail').subscribe(state => {
        expect(state.isEditingProduct).toBeTruthy();
        done();
      })
    })

    it('then hide save button', () => {
      expect(page.querySelector('[test-id="save-button"]')).toBeNull();
    })

    it('then show loading button', () => {
      expect(page.querySelector('[test-id="loading-button"]')).not.toBeNull();
    })

    it('on edit success, then close page', () => {
      store.dispatch(editPurchaseProductSuccess());
      fixture.detectChanges();

      expect(dialogRef.hasClosed).toBeTruthy();
    })
    
  })

});
