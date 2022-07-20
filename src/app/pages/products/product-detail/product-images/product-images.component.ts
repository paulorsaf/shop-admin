import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { ProductImage } from 'src/app/model/product/product';
import { AppState } from 'src/app/store/app-state';
import { removeImage, uploadImage } from '../store/products/product-detail.actions';

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
    private dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.isLoadingImages$ = this.store.select(state =>
      state.productDetail.isLoading || state.productDetail.isRemovingImage
    );
    this.images$ = this.store.select(state => state.productDetail.product?.images || []);
    this.isUploadingImage$ = this.store.select(state => state.productDetail.isUploadingImage);
  }

  uploadImage($event: any) {
    this.store.dispatch(uploadImage({image: $event.target.files[0]}));
    $event.target.value = "";
  }

  askRemoveImage(image: ProductImage) {
    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: "Deseja remover a imagem?",
        description: "Ao remover uma imagem ela não aparecerá mais no aplicativo"
      },
    }).afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(removeImage({image}));
      }
    });
  }

}
