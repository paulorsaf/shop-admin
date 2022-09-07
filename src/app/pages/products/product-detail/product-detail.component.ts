import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription, take } from 'rxjs';
import { Category } from 'src/app/model/category/category';
import { Product } from 'src/app/model/product/product';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { load } from '../../categories/store/categories.actions';
import { clear, loadDetail, loadStock, saveDetail } from './store/products/product-detail.actions';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  form!: FormGroup;

  categories$!: Observable<Category[]>;
  isLoading$!: Observable<boolean>;
  isSaving$!: Observable<boolean>;
  product$!: Observable<Product | undefined>;

  errorSubscription!: Subscription;
  saveSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(clear());

    this.categories$ = this.store.select(state => state.categories.categories);
    this.isLoading$ = this.store.select(state => state.productDetail.isLoading);
    this.isSaving$ = this.store.select(state => state.productDetail.isSaving);
    this.product$ = this.store.select(state => state.productDetail.product);

    this.loadProductDetail();
    this.store.dispatch(load());

    this.watchProductState();
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
    this.saveSubscription.unsubscribe();
  }

  save() {
    this.store.dispatch(saveDetail({product: this.form.value}));
  }

  private watchProductState() {
    this.onError();
    this.onProductSaved();
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
      description: [product?.description || ''],
      id: [product?.id || null],
      name: [product?.name || '', [Validators.required]],
      categoryId: [product?.categoryId || '', [Validators.required]],
      price: [product?.price || 0, [Validators.required]],
      priceWithDiscount: [product?.priceWithDiscount || 0],
      weight: [product?.weight || '', [Validators.required]]
    });
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

  private onProductSaved() {
    this.saveSubscription = this.store
      .select(state => state.productDetail.isSaved)
      .pipe(
        filter(isSaved => isSaved),
        take(1)
      )
      .subscribe(() => {
        if (this.isNew()) {
          window.history.back();
        }
      });
  }

}
