import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { AddStock, Stock } from 'src/app/model/product/stock';
import { AppState } from 'src/app/store/app-state';
import { saveStock } from '../store/products/product-detail.actions';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit, OnDestroy {

  sizes = ['PP', 'P', 'M', 'G', 'GG'];

  form!: FormGroup;

  subscription!: Subscription;

  isSaving$!: Observable<boolean>;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.isSaving$ = this.store.select(state => state.productDetail.isSavingStock);

    this.createForm();

    this.closeModalOnStockSaved();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  save() {
    let color = this.form.value.color;
    const stock: AddStock = {
      ...this.form.value,
      color: color && color.hex ? '#' + color.hex : undefined,
      size: this.form.value.size || undefined
    }

    this.store.dispatch(saveStock({stock}));
  }

  cancel() {
    this.dialogRef.close();
  }

  private closeModalOnStockSaved() {
    this.subscription = this.store
    .select(state => state.productDetail.isSavedStock)
    .pipe(filter(isSavedStock => !!isSavedStock))
    .subscribe(isSavedStock => {
      if (isSavedStock) {
        this.dialogRef.close();
      }
    })
  }

  private createForm() {
    this.form = this.formBuilder.group({
      color: [''],
      quantity: ['', Validators.required],
      size: ['']
    });
  }

}
