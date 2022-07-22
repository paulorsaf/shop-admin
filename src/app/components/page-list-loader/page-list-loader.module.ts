import { NgModule } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PageListLoaderComponent } from './page-list-loader.component';

@NgModule({
  declarations: [
    PageListLoaderComponent
  ],
  imports: [
    NgxSkeletonLoaderModule
  ],
  exports: [PageListLoaderComponent]
})
export class PageListLoaderModule { }
