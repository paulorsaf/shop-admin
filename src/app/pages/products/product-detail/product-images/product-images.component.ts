import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductImage } from 'src/app/model/product/product';
import { AppState } from 'src/app/store/app-state';
import { uploadImage } from '../store/products/product-detail.actions';

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss']
})
export class ProductImagesComponent implements OnInit {

  isLoadingImages$!: Observable<boolean>;
  images$!: Observable<ProductImage[]>;
  isUploadingImage$!: Observable<boolean>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.isLoadingImages$ = this.store.select(state => state.productDetail.isLoading);
    this.images$ = this.store.select(state => state.productDetail.product?.images || []);
    this.isUploadingImage$ = this.store.select(state => state.productDetail.isUploadingImage);
  }

  uploadImage($event: any) {
    this.store.dispatch(uploadImage({image: $event.target.files[0]}));
    $event.target.value = "";
  }

}
