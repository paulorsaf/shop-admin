import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Purchase } from 'src/app/model/purchase/purchase';
import { AppState } from 'src/app/store/app-state';

@Component({
  selector: 'app-purchase-detail-products',
  templateUrl: './purchase-detail-products.component.html',
  styleUrls: ['./purchase-detail-products.component.scss']
})
export class PurchaseDetailProductsComponent implements OnInit {

  purchase$!: Observable<Purchase | undefined>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.purchase$ = this.store.select(state => state.purchaseDetail.purchase);
  }

}
