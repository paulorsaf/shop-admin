import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription } from 'rxjs';
import { PurchaseProduct } from 'src/app/model/purchase/purchase';
import { AppState } from 'src/app/store/app-state';
import { cancelPurchaseProduct } from '../store/purchase-detail.actions';

@Component({
  selector: 'app-purchase-detail-cancel-product',
  templateUrl: './purchase-detail-cancel-product.component.html',
  styleUrls: ['./purchase-detail-cancel-product.component.scss']
})
export class PurchaseDetailCancelProductComponent implements OnInit, OnDestroy {

  isCanceling$!: Observable<boolean>;

  cancelSubscription!: Subscription;

  constructor(
    public dialogRef: MatDialogRef<PurchaseDetailCancelProductComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public product: PurchaseProduct,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.isCanceling$ = this.store.select(state => state.purchaseDetail.isCancelingProduct);

    this.cancelSubscription = this.store
      .select(state => state.purchaseDetail.isCanceledProduct)
      .pipe(filter(isCanceledProduct => isCanceledProduct))
      .subscribe(() => this.close());
  }

  ngOnDestroy(): void {
    this.cancelSubscription.unsubscribe();
  }

  cancel() {
    this.store.dispatch(cancelPurchaseProduct({
      id: this.product.id, stockId: this.product.stock.id
    }));
  }

  close() {
    this.dialogRef.close();
  }

}
