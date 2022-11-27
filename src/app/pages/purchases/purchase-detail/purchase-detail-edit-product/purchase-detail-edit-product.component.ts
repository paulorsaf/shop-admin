import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription } from 'rxjs';
import { PurchaseProduct } from 'src/app/model/purchase/purchase';
import { AppState } from 'src/app/store/app-state';
import { editPurchaseProduct } from '../store/purchase-detail.actions';

@Component({
  selector: 'app-purchase-detail-edit-product',
  templateUrl: './purchase-detail-edit-product.component.html',
  styleUrls: ['./purchase-detail-edit-product.component.scss']
})
export class PurchaseDetailEditProductComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  isEditing$!: Observable<boolean>;

  editProductSubscription!: Subscription;

  constructor(
    public dialogRef: MatDialogRef<PurchaseDetailEditProductComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public product: PurchaseProduct,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.isEditing$ = this.store.select(state => state.purchaseDetail.isEditingProduct);

    this.editProductSubscription = this.store
      .select(state => state.purchaseDetail.isEditedProduct)
      .pipe(filter(isEditedProduct => isEditedProduct))
      .subscribe(() => this.close());

    this.createForm();
  }

  ngOnDestroy(): void {
    this.editProductSubscription.unsubscribe();
  }

  save() {
    this.store.dispatch(editPurchaseProduct({
      productId: this.product.id,
      stockId: this.product.stock.id,
      value: this.product.unit === 'UN' ? this.form.value.amount : this.form.value.weight
    }));
  }

  close() {
    this.dialogRef.close();
  }

  private createForm() {
    const price = (this.product.priceWithDiscount || this.product.price);
    
    this.form = this.formBuilder.group({
      amount: [this.product.amount, this.product.unit === 'UN' ? [Validators.required] : []],
      weight: [this.product.amount * this.product.weight, this.product.unit === 'KG' ? [Validators.required] : []],
      price: [this.product.amount * price]
    });

    this.form.get('amount')?.valueChanges.subscribe(amount => {
      this.form.get('price')?.setValue(amount * price);
    })
    this.form.get('weight')?.valueChanges.subscribe(weight => {
      const amount = weight / this.product.weight;
      this.form.get('price')?.setValue(amount * price);
    })
  }

}
