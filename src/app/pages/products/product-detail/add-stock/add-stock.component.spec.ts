import { DialogRef } from '@angular/cdk/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRefMock } from 'src/mock/mat-dialog.mock';
import { PageMock } from 'src/mock/page.mock';
import { ProductsModule } from '../../products.module';
import { AddStockComponent } from './add-stock.component';

describe('AddStockComponent', () => {
  let component: AddStockComponent;
  let fixture: ComponentFixture<AddStockComponent>;
  let dialogRef: MatDialogRefMock;
  let page: PageMock;

  beforeEach(async () => {
    dialogRef = new MatDialogRefMock();

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ProductsModule
      ],
      providers: [
        MatDialogRef
      ]
    })
    .overrideProvider(MatDialogRef, {useValue: dialogRef})
    .compileComponents();

    fixture = TestBed.createComponent(AddStockComponent);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
    
    fixture.detectChanges();
  });

  it('given user clicks to cancel, then hide modal', () => {
    page.querySelector('[test-id="cancel-button"]').click();
    fixture.detectChanges();

    expect(dialogRef.hasClosed).toBeTruthy();
  });

  it('given page starts, then create form', () => {
    expect(component.form).not.toBeUndefined();
  })

  describe('given form', () => {

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

});
