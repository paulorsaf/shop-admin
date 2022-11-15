import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { PageListLoaderModule } from 'src/app/components/page-list-loader/page-list-loader.module';
import { PaymentTypeNamePipeModule } from 'src/app/pipes/payment-type-name/payment-type-name.module';
import { StatusNamePipeModule } from 'src/app/pipes/status-name/status-name.module';
import { HomeComponent } from './home.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

    PageListLoaderModule,

    PaymentTypeNamePipeModule,
    StatusNamePipeModule,

    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
