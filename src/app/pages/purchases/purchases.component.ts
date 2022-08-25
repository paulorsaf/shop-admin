import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Purchase } from 'src/app/model/purchase/purchase';
import { AppState } from 'src/app/store/app-state';
import { loadPurchases } from './store/purchases.actions';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit {

  isLoading$!: Observable<boolean>;
  purchases$!: Observable<Purchase[]>;

  dataSource!: MatTableDataSource<Purchase[]>;
  displayedColumns = ['date'];

  purchasesSubscription!: Subscription;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Purchase[]>([]);

    this.isLoading$ = this.store.select(state => state.purchases.isLoading);
    this.purchases$ = this.store.select(state => state.purchases.purchases);

    this.onPurchasesChange();

    this.store.dispatch(loadPurchases());
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
