import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Stock, StockOption } from 'src/app/model/product/stock';
import { AppState } from 'src/app/store/app-state';
import { AddStockComponent } from '../add-stock/add-stock.component';
import { removeStock } from '../store/products/product-detail.actions';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit, OnDestroy {

  dataSource!: MatTableDataSource<Stock[]>;
  displayedColumns = ['amount', 'color', 'size', 'delete'];

  isLoadingStock$!: Observable<boolean>;
  stock$!: Observable<StockOption[]>;

  stockSubscription!: Subscription;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Stock[]>([]);

    this.isLoadingStock$ = this.store.select(state =>
      state.productDetail.isLoadingStock || state.productDetail.isRemovingStock
    );
    this.stock$ = this.store.select(state => state.productDetail.stock?.stockOptions || []);

    this.onStockChange();
  }

  ngOnDestroy(): void {
    this.stockSubscription.unsubscribe();
  }

  showAddToStock() {
    this.dialog.open(AddStockComponent, {
      width: '400px'
    })
  }

  edit(stockOption: StockOption) {
    this.dialog.open(AddStockComponent, {
      width: '400px',
      data: {
        stockOption
      }
    })
  }

  askRemove(stockOption: StockOption) {
    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: "Deseja remover a opção do estoque?",
        description: "Ao remover uma opção do estoque ela não aparecerá mais no aplicativo"
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(removeStock({stockOption}));
      }
    });
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
