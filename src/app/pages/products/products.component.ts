import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product/product';
import { AppState } from 'src/app/store/app-state';
import { load } from './store/products.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  dataSource!: MatTableDataSource<Product[]>;
  displayedColumns = ['name', 'category', 'price', 'priceWithDiscount'];

  isLoading$!: Observable<boolean>;
  products$!: Observable<Product[]>;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Product[]>([]);

    this.isLoading$ = this.store.select(state => state.products.isLoading);
    this.store.select(state => state.products.products).subscribe(products => {
      this.dataSource = new MatTableDataSource<any>(products);
    });

    this.store.dispatch(load());
  }

  goToProductDetail(product: Product) {
    this.router.navigate([`/products/${product.id}`]);
  }

}
