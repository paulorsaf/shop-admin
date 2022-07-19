import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Stock, StockOption } from 'src/app/model/product/stock';
import { AppState } from 'src/app/store/app-state';
import { AddStockComponent } from '../add-stock/add-stock.component';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit, OnDestroy {

  dataSource!: MatTableDataSource<Stock[]>;
  displayedColumns = ['amount', 'color', 'size'];

  isLoadingStock$!: Observable<boolean>;
  stock$!: Observable<StockOption[]>;

  stockSubscription!: Subscription;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Stock[]>([]);

    this.isLoadingStock$ = this.store.select(state => state.productDetail.isLoadingStock);
    this.stock$ = this.store.select(state => state.productDetail.stock?.stockOptions || []);

    this.onStockChange();
  }

  ngOnDestroy(): void {
    this.stockSubscription.unsubscribe();
  }

  showAddToStock() {
    this.dialog.open(AddStockComponent);
  }

  private onStockChange() {
    this.stockSubscription =
      this.store
        .select(state => state.productDetail.stock)
        .subscribe(stock => {
          this.dataSource = new MatTableDataSource<any>(stock?.stockOptions || []);
        });
  }

}
