import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Purchase } from 'src/app/model/purchase/purchase';
import { AppState } from 'src/app/store/app-state';

@Component({
  selector: 'app-purchase-detail-product-notes',
  templateUrl: './purchase-detail-product-notes.component.html',
  styleUrls: ['./purchase-detail-product-notes.component.scss']
})
export class PurchaseDetailProductNotesComponent implements OnInit {

  purchase$!: Observable<Purchase | undefined>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.purchase$ = this.store.select(state => state.purchaseDetail.purchase);
  }

}
