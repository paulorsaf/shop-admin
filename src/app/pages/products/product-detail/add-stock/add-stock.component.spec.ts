import { Color } from '@angular-material-components/color-picker';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { MatDialogRefMock } from 'src/mock/mat-dialog.mock';
import { PageMock } from 'src/mock/page.mock';
import { ProductsModule } from '../../products.module';
import { saveStockOptionSuccess, updateStockOptionSuccess } from '../store/products/product-detail.actions';
import { productDetailReducer } from '../store/products/product-detail.reducers';
import { AddStockComponent } from './add-stock.component';

describe('AddStockComponent', () => {
  let component: AddStockComponent;
  let fixture: ComponentFixture<AddStockComponent>;
  let dialogRef: MatDialogRefMock;
  let page: PageMock;
  let store: Store<AppState>;

  const stockOption = {id: 'anyId', color: '#800080', quantity: 10, size: 'anySize'} as any;

  beforeEach(async () => {
    dialogRef = new MatDialogRefMock();

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ProductsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('productDetail', productDetailReducer)
      ],
      providers: [
        MatDialogRef
      ]
    })
    .overrideProvider(MatDialogRef, {useValue: dialogRef})
    .overrideProvider(MAT_DIALOG_DATA, {useValue: {}})
    .compileComponents();

    fixture = TestBed.createComponent(AddStockComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  });

  it('given user clicks to cancel, then hide modal', () => {
    fixture.detectChanges();

    page.querySelector('[test-id="cancel-button"]').click();
    fixture.detectChanges();

    expect(dialogRef.hasClosed).toBeTruthy();
  });

  describe('given new stock product, when page starts', () => {

    it('then create form', () => {
      fixture.detectChanges();
  
      expect(component.form).not.toBeUndefined();
    })
  
    it('then form should have empty values', () => {
      fixture.detectChanges();
  
      expect(component.form.value).toEqual({
        color: '',
        quantity: '',
        size: ''
      });
    })

  })

  describe('given edit stock product, when page starts', () => {

    beforeEach(() => {
      component.data.stockOption = stockOption;
      fixture.detectChanges();
    })

    it('then create form', () => {
      expect(component.form).not.toBeUndefined();
    })
  
    it('then form should have stock product values', () => {
      expect(component.form.value).toEqual({
        color: new Color(128, 0, 128),
        quantity: 10,
        size: 'anySize'
      });
    })

  });

  describe('given form', () => {

    beforeEach(() => {
      fixture.detectChanges();
    })

    it('when quantity is empty, then quantity should be invalid', () => {
      component.form.get('quantity')?.setValue('');
      fixture.detectChanges();

      expect(component.form.get('quantity')!.valid).toBeFalsy();
    })

    it('when quantity has a value, then quantity should be valid', () => {
      component.form.get('quantity')?.setValue(10);
      fixture.detectChanges();

      expect(component.form.get('quantity')!.valid).toBeTruthy();
    })

    it('when invalid, then disable save button', () => {
      component.form.get('quantity')?.setValue('');
      fixture.detectChanges();

      expect(page.querySelector('[test-id="save-button"]').disabled).toBeTruthy();
    })

    it('when valid, then enable save button', () => {
      component.form.get('quantity')?.setValue('10');
      fixture.detectChanges();

      expect(page.querySelector('[test-id="save-button"]').disabled).toBeFalsy();
    })

  })

  describe('given user clicks on save button', () => {

    beforeEach(() => {
      fixture.detectChanges();

      component.form.get('quantity')?.setValue('10');
      fixture.detectChanges();

      page.querySelector('[test-id="save-button"]').click();
      fixture.detectChanges();
    })

    it('then save stock', done => {
      store.select('productDetail').subscribe(state => {
        expect(state.isSavingStock).toBeTruthy();
        done();
      })
    })

    it('then hide action buttons', () => {
      expect(page.querySelector('[test-id="action-buttons"]')).toBeNull();
    })

    it('then show save stock loader', () => {
      expect(page.querySelector('[test-id="save-stock-loader"]')).not.toBeNull();
    })

    describe('when stock saved', () => {

      beforeEach(() => {
        store.dispatch(saveStockOptionSuccess());
        fixture.detectChanges();
      })

      it('then show action buttons', () => {
        expect(page.querySelector('[test-id="action-buttons"]')).not.toBeNull();
      })

      it('then hide save stock loader', () => {
        expect(page.querySelector('[test-id="save-stock-loader"]')).toBeNull();
      })

      it('then close add stock page', () => {
        expect(dialogRef.hasClosed).toBeTruthy();
      })

    })

  })

  describe('given user clicks on update button', () => {

    beforeEach(() => {
      component.data.stockOption = stockOption;
      fixture.detectChanges();

      component.form.get('quantity')?.setValue('10');
      fixture.detectChanges();

      page.querySelector('[test-id="save-button"]').click();
      fixture.detectChanges();
    })

    it('then update stock', done => {
      store.select('productDetail').subscribe(state => {
        expect(state.isUpdatingStock).toBeTruthy();
        done();
      })
    })

    it('then hide action buttons', () => {
      expect(page.querySelector('[test-id="action-buttons"]')).toBeNull();
    })

    it('then show save stock loader', () => {
      expect(page.querySelector('[test-id="save-stock-loader"]')).not.toBeNull();
    })

    describe('when stock updated', () => {

      beforeEach(() => {
        store.dispatch(updateStockOptionSuccess());
        fixture.detectChanges();
      })

      it('then show action buttons', () => {
        expect(page.querySelector('[test-id="action-buttons"]')).not.toBeNull();
      })

      it('then hide save stock loader', () => {
        expect(page.querySelector('[test-id="save-stock-loader"]')).toBeNull();
      })

      it('then close add stock page', () => {
        expect(dialogRef.hasClosed).toBeTruthy();
      })

    })

  });

});
