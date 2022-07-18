import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription, take } from 'rxjs';
import { Category } from 'src/app/model/category/category';
import { Product } from 'src/app/model/product/product';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { load } from '../../categories/store/categories.actions';
import { AddStockComponent } from './add-stock/add-stock.component';
import { loadDetail, loadStock, saveDetail } from './store/products/product-detail.actions';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  displayedColumns = ['amount', 'color', 'size'];
  form!: FormGroup;

  categories$!: Observable<Category[]>;
  isLoading$!: Observable<boolean>;
  isLoadingStock$!: Observable<boolean>;
  isSaving$!: Observable<boolean>;
  product$!: Observable<Product | undefined>;
  stock$!: Observable<any[]>;

  errorSubscription!: Subscription;
  saveSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.categories$ = this.store.select(state => state.categories.categories);
    this.isLoading$ = this.store.select(state => state.productDetail.isLoading);
    this.isLoadingStock$ = this.store.select(state => state.productDetail.isLoadingStock);
    this.isSaving$ = this.store.select(state => state.productDetail.isSaving);
    this.product$ = this.store.select(state => state.productDetail.product);
    this.stock$ = this.store.select(state => state.productDetail.stock);

    this.loadProductDetail();

    this.store.dispatch(load());

    this.onError();
    this.onCategorySaved();
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

  save() {
    this.store.dispatch(saveDetail({product: this.form.value}));
  }

  showAddToStock() {
    this.dialog.open(AddStockComponent);
  }

  private loadProductDetail() {
    if (this.isNew()) {
      this.createForm();
    } else {
      const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
      this.store.dispatch(loadDetail({id}));
      this.store.dispatch(loadStock({id}));
      this.createFormOnProductDetailLoaded();
    }
  }

  private isNew() {
    return this.getId() === "new";
  }

  private getId() {
    return this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  private createFormOnProductDetailLoaded() {
    this.store.select('productDetail')
      .pipe(
        filter(state => !!state.isLoaded),
        take(1)
      )
      .subscribe(state => this.createForm(state.product))
  }

  private createForm(product?: Product) {
    this.form = this.formBuilder.group({
      id: [product?.id || null],
      name: [product?.name || '', [Validators.required]],
      categoryId: [product?.categoryId || '', [Validators.required]],
      price: [product?.price || 0, [Validators.required]],
      priceWithDiscount: [product?.priceWithDiscount || 0]
    });
    console.log(this.form.value)
  }

  private onError() {
    this.errorSubscription = this.store
      .select(state => state.productDetail.error)
      .pipe(
        filter(isSaved => isSaved)
      )
      .subscribe(error => {
        this.messageService.showError(error.error)
      });
  }

  private onCategorySaved() {
    this.saveSubscription = this.store
      .select(state => state.productDetail.isSaved)
      .pipe(
        filter(isSaved => isSaved),
        take(1)
      )
      .subscribe(() => window.history.back());
  }

}
