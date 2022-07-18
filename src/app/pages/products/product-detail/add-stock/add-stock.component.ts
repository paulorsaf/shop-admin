import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {

  sizes = ['PP', 'P', 'M', 'G', 'GG'];

  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  save() {
    
  }

  cancel() {
    this.dialogRef.close();
  }

  private createForm() {
    this.form = this.formBuilder.group({
      color: [''],
      quantity: ['', Validators.required],
      size: ['']
    });
  }

}
