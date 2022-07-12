import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/model/product/product';
import { AppState } from 'src/app/store/app-state';
import { load } from './store/products/products.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  dataSource!: MatTableDataSource<Product[]>;
  displayedColumns = ['name', 'category', 'price', 'priceWithDiscount'];

  hasProducts$!: Observable<boolean>;
  isLoading$!: Observable<boolean>;

  subscription!: Subscription;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Product[]>([]);

    this.hasProducts$ = this.store.select(state => state.products.products.length > 0);
    this.isLoading$ = this.store.select(state => state.products.isLoading);

    this.onProductsChange();

    this.store.dispatch(load());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goToProductDetail(product: Product) {
    this.router.navigate([`/products/${product.id}`]);
  }

  goToAddProductDetail() {
    this.router.navigate([`/products/new`]);
  }

  private onProductsChange() {
    this.subscription =
      this.store
        .select(state => state.products.products)
        .subscribe(products => {
          this.dataSource = new MatTableDataSource<any>(products);
        });
  }

}
