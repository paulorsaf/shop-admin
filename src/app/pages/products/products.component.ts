import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/model/product/product';
import { AppState } from 'src/app/store/app-state';
import { load, loadMoreProducts, remove } from './store/products/products.actions';
import { load as loadCategories } from 'src/app/pages/categories/store/categories.actions';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  dataSource!: MatTableDataSource<Product[]>;
  displayedColumns = ['name', 'category', 'price', 'priceWithDiscount', 'totalStock', 'delete'];

  hasProducts$!: Observable<boolean>;
  isLoading$!: Observable<boolean>;
  isLoadingMoreProducts$!: Observable<boolean>;
  hasMoreProductsToLoad$!: Observable<boolean>;

  errorSubscription!: Subscription;
  subscription!: Subscription;

  constructor(
    private dialog: MatDialog,
    private messageService: MessageService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Product[]>([]);

    this.hasMoreProductsToLoad$ = this.store.select(state => state.products.hasMoreToLoad);
    this.hasProducts$ = this.store.select(state => state.products.products.length > 0);
    this.isLoading$ = this.store.select(state =>
      state.products.isLoading || state.products.isRemoving
    );
    this.isLoadingMoreProducts$ = this.store.select(state => state.products.isLoadingMoreProducts);

    this.onError();
    this.onProductsChange();

    this.store.dispatch(load());
    this.store.dispatch(loadCategories());
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  goToProductDetail(product: Product) {
    this.router.navigate([`/products/${product.id}`]);
  }

  goToAddProductDetail() {
    this.router.navigate([`/products/new`]);
  }

  askRemove($event: any, product: Product) {
    $event.stopPropagation();

    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: "Deseja remover o produto?",
        description: "Ao remover um produto ele não aparecerá mais no aplicativo"
      },
    }).afterClosed().subscribe(result => {
      if (result) {
        this.remove(product);
      }
    });
  }

  loadMore() {
    this.store.dispatch(loadMoreProducts());
  }

  private remove(product: Product) {
    this.store.dispatch(remove({product}));
  }

  private onProductsChange() {
    this.subscription =
      this.store
        .select(state => state.products.products)
        .subscribe(products => {
          this.dataSource = new MatTableDataSource<any>(products);
        });
  }

  private onError() {
    this.errorSubscription =
      this.store.select(state => state.products.error)
        .pipe(filter(error => !!error))
        .subscribe(error => this.messageService.showError(error.error));
  }

}
