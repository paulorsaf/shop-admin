import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { PurchaseSummary } from 'src/app/model/purchase/purchase-summary';
import { AppState } from 'src/app/store/app-state';
import { loadPurchases, printPurchase } from './store/purchases.actions';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit {

  isLoading$!: Observable<boolean>;
  purchases$!: Observable<PurchaseSummary[]>;

  dataSource!: MatTableDataSource<PurchaseSummary[]>;
  displayedColumns = [
    'user', 'totalAmount', 'totalPrice', 'delivery', 'status', 'payment', 'date', 'print'
  ];

  purchasesSubscription!: Subscription;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<PurchaseSummary[]>([]);

    this.isLoading$ = this.store.select(state => state.purchases.isLoading);
    this.purchases$ = this.store.select(state => state.purchases.purchases);

    this.onPurchasesChange();

    this.store.dispatch(loadPurchases());
  }

  openReceipt(receiptUrl: string, event$?: any) {
    event$?.stopPropagation();

    window.open(receiptUrl, '_blank')
  }

  goToPurchaseDetail(purchase: PurchaseSummary) {
    this.router.navigate([`purchases/${purchase.id}`])
  }

  print($event: any, purchase: PurchaseSummary) {
    $event.stopPropagation();
    this.store.dispatch(printPurchase({id: purchase.id}));
  }

  private onPurchasesChange() {
    this.purchasesSubscription =
      this.store
        .select(state => state.purchases.purchases)
        .subscribe(purchases => {
          this.dataSource = new MatTableDataSource<any>(purchases);
        });
  }

}
