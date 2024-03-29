import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductsComponent } from './products.component';
import { MatTableModule } from '@angular/material/table';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MatSelectModule } from '@angular/material/select';
import { CategoryNamePipeModule } from 'src/app/pipes/category-name/category-name.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { AddStockComponent } from './product-detail/add-stock/add-stock.component';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { StockListComponent } from './product-detail/stock-list/stock-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProductImagesComponent } from './product-detail/product-images/product-images.component';
import { ProductDetailLoadingComponent } from './product-detail/product-detail-loading/product-detail-loading.component';
import { PageListLoaderModule } from 'src/app/components/page-list-loader/page-list-loader.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ButtonLoaderModule } from 'src/app/components/button-loader/button-loader.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: ':id', component: ProductDetailComponent }
];

@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailComponent,
    AddStockComponent,
    StockListComponent,
    ProductImagesComponent,
    ProductDetailLoadingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

    PageListLoaderModule,
    NgxSkeletonLoaderModule,
    ButtonLoaderModule,

    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTableModule,

    NgxMatColorPickerModule,

    CategoryNamePipeModule
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ],
  exports: [
    ProductsComponent,
    AddStockComponent
  ]
})
export class ProductsModule { }
