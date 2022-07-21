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
import { ConfirmDialogModule } from 'src/app/components/confirm-dialog/confirm-dialog.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BannersComponent } from './banners.component';

const routes: Routes = [
  { path: '', component: BannersComponent }
];

@NgModule({
  declarations: [
    BannersComponent
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
  exports: [BannersComponent]
})
export class BannersModule { }
