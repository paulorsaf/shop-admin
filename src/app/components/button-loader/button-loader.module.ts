import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ButtonLoaderComponent } from './button-loader.component';

@NgModule({
  declarations: [
    ButtonLoaderComponent
  ],
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ButtonLoaderComponent
  ]
})
export class ButtonLoaderModule { }
