import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, of, take } from 'rxjs';
import { Category } from 'src/app/model/category/category';
import { AppState } from 'src/app/store/app-state';
import { load } from '../../categories/store/categories.actions';
import { loadDetail } from './store/products/product-detail.actions';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  form!: FormGroup;

  categories$!: Observable<Category[]>;
  isLoading$!: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.categories$ = this.store.select(state => state.categories.categories);
    this.isLoading$ = this.store.select(state => state.productDetail.isLoading);

    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.store.dispatch(loadDetail({id}));

    this.store.dispatch(load());

    this.createForm();
  }

  private createForm() {
    this.store.select('productDetail')
      .pipe(
        filter(state => !!state.isLoaded),
        take(1)
      )
      .subscribe(state => {
        const product = state.product;
        this.form = this.formBuilder.group({
          name: [product?.name || ''],
          category: [product?.category.id || ''],
          price: [product?.price || 0],
          priceWithDiscount: [product?.priceWithDiscount || 0]
        });
      })
  }

  save() {

  }

  cancel() {
    
  }

}
