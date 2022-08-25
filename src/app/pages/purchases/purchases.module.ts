import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PurchasesComponent } from './purchases.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PageListLoaderModule } from 'src/app/components/page-list-loader/page-list-loader.module';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [{
  path: '',
  component: PurchasesComponent
}];

@NgModule({
  declarations: [
    PurchasesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

    PageListLoaderModule,
    NgxSkeletonLoaderModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  exports: [PurchasesComponent]
})
export class PurchasesModule { }
