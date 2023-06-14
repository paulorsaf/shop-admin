import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription, take } from 'rxjs';
import { Banner } from 'src/app/model/banner/banner';
import { Product } from 'src/app/model/product/product';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { loadProducts } from '../../products/store/products/products.actions';
import { clearBannerDetail, loadBannerDetail, saveBannerDetail } from './store/banner-detail.actions';

@Component({
  selector: 'app-banner-detail',
  templateUrl: './banner-detail.component.html',
  styleUrls: ['./banner-detail.component.scss']
})
export class BannerDetailComponent implements OnInit, OnDestroy {

  form!: FormGroup;

  isLoading$!: Observable<boolean>;
  isSaving$!: Observable<boolean>;
  products$!: Observable<Product[]>;

  errorSubscription!: Subscription;
  saveSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(clearBannerDetail());

    this.isLoading$ = this.store.select(state =>
      state.bannerDetail.isLoading || state.products.isLoading
    );
    this.isSaving$ = this.store.select(state => state.bannerDetail.isSaving);

    this.products$ = this.store.select(state => state.products.products || []);

    this.onError();
    this.onSave();

    this.loadBannerPage();
    this.store.dispatch(loadProducts());
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
    this.saveSubscription.unsubscribe();
  }

  save() {
    this.store.dispatch(saveBannerDetail({
      banner: this.form.value
    }))
  }

  private onSave() {
    this.saveSubscription = this.store
      .select('bannerDetail')
      .pipe(
        filter(state => state.isSaved)
      )
      .subscribe(() => {
        window.history.back();
      })
  }

  private loadBannerPage() {
    if (this.isNewBanner()) {
      this.createForm();
    } else {
      this.loadBannerDetailAndForm();
    }
  }

  private loadBannerDetailAndForm() {
    const id = this.getId();

    this.store.select('bannerDetail').pipe(
      filter(state => state.banner || state.error),
      take(1)
    ).subscribe(state => {
      if (state.banner) {
        this.createForm(state.banner);
      }
    })

    this.store.dispatch(loadBannerDetail({id}));
  }

  private createForm(banner?: Banner) {
    this.form = this.formBuilder.group({
      id: [banner?.id || ''],
      productId: [banner?.productId || '', [Validators.required]]
    })
  }

  private onError() {
    this.errorSubscription = this.store
      .select(state => state.bannerDetail.error)
      .pipe(
        filter(error => !!error)
      )
      .subscribe(error => {
        this.messageService.showError(error);
      })
  }

  private isNewBanner() {
    return this.getId() === 'new';
  }

  private getId() {
    return this.activatedRoute.snapshot.paramMap.get('id') || "";
  }

}
