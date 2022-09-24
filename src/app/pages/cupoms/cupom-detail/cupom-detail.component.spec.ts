import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { Cupom } from 'src/app/model/cupom/cupom';
import { AppState } from 'src/app/store/app-state';
import { MatDialogRefMock } from 'src/mock/mat-dialog.mock';
import { PageMock } from 'src/mock/page.mock';
import { CupomsModule } from '../cupoms.module';
import { saveCupomFail, saveCupomSuccess } from '../store/cupoms.actions';
import { cupomsReducer } from '../store/cupoms.reducers';
import { CupomDetailComponent } from './cupom-detail.component';

describe('CupomDetailComponent', () => {
  let component: CupomDetailComponent;
  let fixture: ComponentFixture<CupomDetailComponent>;
  let page: PageMock;
  let dialogRef: MatDialogRefMock;
  let store: Store<AppState>;

  const cupom: Cupom = {
    amountLeft: 10,
    cupom: "anyCupom",
    discount: 10,
    expireDate: "2030-12-31",
    id: "anyCupomId"
  }

  beforeEach(async () => {
    dialogRef = new MatDialogRefMock();

    await TestBed.configureTestingModule({
      declarations: [ CupomDetailComponent ],
      imports: [
        CupomsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('cupoms', cupomsReducer)
      ]
    })
    .overrideProvider(MatDialogRef, {useValue: dialogRef})
    .overrideProvider(MAT_DIALOG_DATA, {useValue: {}})
    .compileComponents();

    fixture = TestBed.createComponent(CupomDetailComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  });

  describe('given page starts', () => {

    it('then create form', () => {
      fixture.detectChanges();
      
      expect(component.form).not.toBeUndefined();
    })

    it('when new cupom, then populate form with empty values', () => {
      fixture.detectChanges();

      expect(component.form.value).toEqual({
        id: '',
        amountLeft: '',
        cupom: '',
        discount: '',
        expireDate: ''
      })
    })

    it('when edit cupom, then populate form with cupom details', () => {
      component.data = {cupom};
      fixture.detectChanges();

      expect(component.form.value).toEqual({
        id: "anyCupomId",
        amountLeft: 10,
        cupom: "anyCupom",
        discount: 10,
        expireDate: "2030-12-31"
      })
    })
    
  });

  describe('given form', () => {

    beforeEach(() => {
      fixture.detectChanges();
    })

    it('when cupom is empty, then cupom should be invalid', () => {
      component.form.get('cupom')?.setValue('');
      fixture.detectChanges();

      expect(component.form.get('cupom')!.valid).toBeFalsy()
    })

    it('when cupom is filled, then cupom should be valid', () => {
      component.form.get('cupom')?.setValue('anyCupom');
      fixture.detectChanges();

      expect(component.form.get('cupom')!.valid).toBeTruthy()
    })

    it('when discount is empty, then discount should be invalid', () => {
      component.form.get('discount')?.setValue('');
      fixture.detectChanges();

      expect(component.form.get('discount')!.valid).toBeFalsy()
    })

    it('when discount is filled, then discount should be valid', () => {
      component.form.get('discount')?.setValue('anyDiscount');
      fixture.detectChanges();

      expect(component.form.get('discount')!.valid).toBeTruthy()
    })

    it('when form is invalid, then disable save button', () => {
      component.form.get('cupom')?.setValue('');
      fixture.detectChanges();

      expect(page.querySelector('[test-id="save-button"]').disabled).toBeTruthy();
    })

    it('when form is valid, then enable save button', () => {
      component.form.get('cupom')?.setValue('anyCupom');
      component.form.get('discount')?.setValue('anyDiscount');
      fixture.detectChanges();

      expect(page.querySelector('[test-id="save-button"]').disabled).toBeFalsy();
    })

  })

  it('given user clicks on cancel button, then hide page', () => {
    fixture.detectChanges();

    page.querySelector('[test-id="cancel-button"]').click();
    fixture.detectChanges();

    expect(dialogRef.hasClosed).toBeTruthy();
  })

  describe('given user clicks on save button', () => {

    beforeEach(() => {
      component.data = {cupom};
      fixture.detectChanges();

      page.querySelector('[test-id="save-button"]').click();
      fixture.detectChanges();
    })

    it('when new cupom, then save cupom', done => {
      store.select('cupoms').subscribe(state => {
        expect(state.isSaving).toBeTruthy();
        done();
      })
    })

    describe('when saving', () => {

      it('then show save cupom loader', () => {
        expect(page.querySelector('[test-id="save-cupom-loader"]')).not.toBeNull();
      })

      it('then hide save cupom button', () => {
        expect(page.querySelector('[test-id="save-button"]')).toBeNull();
      })

    })

    describe('when saved', () => {

      beforeEach(() => {
        store.dispatch(saveCupomSuccess());
        fixture.detectChanges();
      })

      it('then hide save cupom loader', () => {
        expect(page.querySelector('[test-id="save-cupom-loader"]')).toBeNull();
      })

      it('then show save cupom button', () => {
        expect(page.querySelector('[test-id="save-button"]')).not.toBeNull();
      })

      it('then close cupom page', () => {
        expect(dialogRef.hasClosed).toBeTruthy();
      })

    })

    describe('when error on save cupom', () => {

      beforeEach(() => {
        const error = {error: "error"};
        store.dispatch(saveCupomFail({error}));
        fixture.detectChanges();
      })

      it('then hide save cupom loader', () => {
        expect(page.querySelector('[test-id="save-cupom-loader"]')).toBeNull();
      })

      it('then show save cupom button', () => {
        expect(page.querySelector('[test-id="save-button"]')).not.toBeNull();
      })

    })

  })

});
