import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PageListLoaderModule } from 'src/app/components/page-list-loader/page-list-loader.module';
import { MatTableModule } from '@angular/material/table';
import { ClientsComponent } from './clients.component';

const routes: Routes = [{
  path: '',
  component: ClientsComponent
}];

@NgModule({
  declarations: [
    ClientsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

    PageListLoaderModule,
    NgxSkeletonLoaderModule,

    MatProgressSpinnerModule,
    MatTableModule
  ],
  exports: [ClientsComponent]
})
export class UsersModule { }
