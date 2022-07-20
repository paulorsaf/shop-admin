import { Color } from '@angular-material-components/color-picker';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { AddStock, StockOption } from 'src/app/model/product/stock';
import { AppState } from 'src/app/store/app-state';
import { saveStockOption, updateStockOption } from '../store/products/product-detail.actions';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit, OnDestroy {

  @ViewChild('colorPickerInput') colorPickerInput: any;

  sizes = ['PP', 'P', 'M', 'G', 'GG'];

  form!: FormGroup;

  subscription!: Subscription;

  isSaving$!: Observable<boolean>;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {stockOption: StockOption},
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private changeRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.isSaving$ = this.store.select(state =>
      state.productDetail.isSavingStock || state.productDetail.isUpdatingStock
    );

    this.createForm();

    this.closeModalOnStockSaved();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  save() {
    const stock: AddStock = {
      ...this.form.value,
      color: this.getInputColor(),
      size: this.form.value.size || undefined
    }

    if (this.data?.stockOption?.id) {
      this.store.dispatch(updateStockOption({stockOption: {...stock, id: this.data.stockOption.id}}));
    } else {
      this.store.dispatch(saveStockOption({stock}));
    }
  }

  private getInputColor() {
    const color = this.form.value.color;
    console.log(color)
    if (typeof color === 'string') {
      return color;
    }
    return color && color.hex ? '#' + color.hex : undefined;
  }

  cancel() {
    this.dialogRef.close();
  }

  private closeModalOnStockSaved() {
    this.subscription = this.store
    .select(state => ({
      isSavedStock: state.productDetail.isSavedStock,
      isUpdatedStock: state.productDetail.isUpdatedStock
    }))
    .pipe(filter(state => state.isSavedStock || state.isUpdatedStock))
    .subscribe(() => {
      this.dialogRef.close();
    })
  }

  private createForm() {
    const color = this.getColor();

    this.form = this.formBuilder.group({
      color: [color || ''],
      quantity: [this.data?.stockOption?.quantity || '', Validators.required],
      size: [this.data?.stockOption?.size || '']
    });
  }

  private getColor() {
    if (this.data?.stockOption?.color) {
      const rgbColor = this.hexToRgb(this.data?.stockOption?.color || '');
      return new Color(rgbColor?.r || 0, rgbColor?.g || 0, rgbColor?.b || 0);
    }
    return null;
  }

  private hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

}
