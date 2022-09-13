import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule, Routes } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CompanyDetailPaymentComponent } from './company-detail/company-detail-payment/company-detail-payment.component';

const routes: Routes = [{
  path: '',
  component: CompanyDetailComponent
}];

@NgModule({
  declarations: [
    CompanyDetailComponent,
    CompanyDetailPaymentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

    NgxSkeletonLoaderModule,

    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,

    AngularEditorModule
  ],
  exports: [CompanyDetailComponent]
})
export class CompaniesModule { }
