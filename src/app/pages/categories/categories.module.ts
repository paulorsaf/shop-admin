import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatSelectModule } from '@angular/material/select';
import { CategoriesComponent } from './categories.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

const routes: Routes = [
  { path: '', component: CategoriesComponent },
  { path: ':id', component: CategoryDetailComponent }
];

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

    NgxSkeletonLoaderModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule
  ],
  exports: [CategoriesComponent]
})
export class CategoriesModule { }
