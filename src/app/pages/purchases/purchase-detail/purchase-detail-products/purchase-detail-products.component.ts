import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Purchase, PurchaseProduct } from 'src/app/model/purchase/purchase';
import { AppState } from 'src/app/store/app-state';
import { PurchaseDetailCancelProductComponent } from '../purchase-detail-cancel-product/purchase-detail-cancel-product.component';
import { PurchaseDetailEditProductComponent } from '../purchase-detail-edit-product/purchase-detail-edit-product.component';

@Component({
  selector: 'app-purchase-detail-products',
  templateUrl: './purchase-detail-products.component.html',
  styleUrls: ['./purchase-detail-products.component.scss']
})
export class PurchaseDetailProductsComponent implements OnInit {

  purchase$!: Observable<Purchase | undefined>;

  constructor(
    private matDialog: MatDialog,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.purchase$ = this.store.select(state => state.purchaseDetail.purchase);
  }

  showEditProduct(product: PurchaseProduct) {
    this.matDialog.open(PurchaseDetailEditProductComponent, {
      data: product
    });
  }

  showCancelProduct(product: PurchaseProduct) {
    this.matDialog.open(PurchaseDetailCancelProductComponent, {
      data: product
    });
  }

}
