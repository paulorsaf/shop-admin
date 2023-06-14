import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription, take } from 'rxjs';
import { Product } from 'src/app/model/product/product';
import { AppState } from 'src/app/store/app-state';
import { loadProducts, loadMoreProducts, removeProduct, filterProducts } from './store/products/products.actions';
import { load as loadCategories } from 'src/app/pages/categories/store/categories.actions';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { MessageService } from 'src/app/services/message/message.service';
import { changeVisibility } from './product-detail/store/products/product-detail.actions';
import { Category } from 'src/app/model/category/category';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  dataSource!: MatTableDataSource<Product[]>;
  
  categories$!: Observable<Category[]>;
  displayedColumns$!: Observable<string[]>;
  hasProducts$!: Observable<boolean>;
  isChangingVisibility$!: Observable<boolean>;
  isLoading$!: Observable<boolean>;
  isLoadingMoreProducts$!: Observable<boolean>;
  productChangingVisibilityId$!: Observable<string | undefined>;
  hasMoreProductsToLoad$!: Observable<boolean>;

  errorSubscription!: Subscription;
  subscription!: Subscription;

  category: string = "";
  internalId: string = "";

  constructor(
    private dialog: MatDialog,
    private messageService: MessageService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Product[]>([]);

    this.categories$ = this.store.select(store => store.categories.categories);
    this.displayedColumns$ = this.store.select(
      state => state.products?.products?.some(p => p.productInternalId) ?
        ['id', 'name', 'category', 'price', 'priceWithDiscount', 'totalStock', 'showProduct', 'delete'] :
        ['name', 'category', 'price', 'priceWithDiscount', 'totalStock', 'showProduct', 'delete']
    );
    this.hasMoreProductsToLoad$ = this.store.select(
      state => state.products.hasMoreToLoad
    );
    this.hasProducts$ = this.store.select(state => state.products.products.length > 0);
    this.isChangingVisibility$ = this.store.select(store => store.productDetail.isChangingVisibility);
    this.isLoading$ = this.store.select(state =>
      state.products.isLoading || state.products.isRemoving || state.products.isFiltering
    );
    this.isLoadingMoreProducts$ = this.store.select(
      state => state.products.isLoadingMoreProducts
    );
    this.productChangingVisibilityId$ = this.store.select(
      store => store.productDetail.productChangingVisibilityId || store.products.productDetailId
    );

    this.onError();
    this.onProductsChange();

    this.store.dispatch(loadProducts());
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

  filter() {
    this.store.dispatch(filterProducts({
      filter: {
        categoryId: this.category,
        internalId: this.internalId
      }
    }));
  }

  toggleVisibility(product: Product) {
    this.store.dispatch(changeVisibility({id: product.id}));

    this.store.select('productDetail')
      .pipe(
        filter(state => !state.isChangingVisibility),
        take(1)
      )
      .subscribe(state => {
        if (state.error) {
          this.messageService.showError(state.error.error);
        }
      });
  }

  private remove(product: Product) {
    this.store.dispatch(removeProduct({product}));
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
