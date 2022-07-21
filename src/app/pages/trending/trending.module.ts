import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ConfirmDialogModule } from 'src/app/components/confirm-dialog/confirm-dialog.module';
import { MatDialogModule } from '@angular/material/dialog';
import { TrendingComponent } from './trending.component';

const routes: Routes = [
  { path: '', component: TrendingComponent }
];

@NgModule({
  declarations: [
    TrendingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ConfirmDialogModule,

    NgxSkeletonLoaderModule,

    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  exports: [TrendingComponent]
})
export class TrendingModule { }
