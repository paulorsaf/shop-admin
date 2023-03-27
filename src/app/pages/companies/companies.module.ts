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
import { ServiceTaxComponent } from './company-detail/service-tax/service-tax.component';
import { MatIconModule } from '@angular/material/icon';
import { ButtonLoaderModule } from 'src/app/components/button-loader/button-loader.module';

const routes: Routes = [{
  path: '',
  component: CompanyDetailComponent
}];

@NgModule({
  declarations: [
    CompanyDetailComponent,
    CompanyDetailPaymentComponent,
    ServiceTaxComponent
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
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ButtonLoaderModule,

    AngularEditorModule
  ],
  exports: [CompanyDetailComponent]
})
export class CompaniesModule { }
