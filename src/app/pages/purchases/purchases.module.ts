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
import { StatusNamePipeModule } from 'src/app/pipes/status-name/status-name.module';
import { PaymentTypeNamePipeModule } from 'src/app/pipes/payment-type-name/payment-type-name.module';
import { MatIconModule } from '@angular/material/icon';
import { PurchaseDetailComponent } from './purchase-detail/purchase-detail.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { PurchaseDetailLoaderComponent } from './purchase-detail/purchase-detail-loader/purchase-detail-loader.component';

const routes: Routes = [{
  path: '',
  component: PurchasesComponent
}, {
  path: ':id',
  component: PurchaseDetailComponent
}];

@NgModule({
  declarations: [
    PurchasesComponent,
    PurchaseDetailComponent,
    PurchaseDetailLoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

    PageListLoaderModule,
    NgxSkeletonLoaderModule,

    StatusNamePipeModule,
    PaymentTypeNamePipeModule,

    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule
  ],
  exports: [PurchasesComponent]
})
export class PurchasesModule { }
