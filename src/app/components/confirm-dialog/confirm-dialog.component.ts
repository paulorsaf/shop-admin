import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  input: string = "";

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  no() {
    this.dialogRef.close();
  }

  yes() {
    this.dialogRef.close(this.data.input ? {
      value: this.input
    } : "YES");
  }

}

type ConfirmDialogData = {
  description: string;
  input: ConfirmDialogInputData;
  title: string;
}

type ConfirmDialogInputData = {
  label: string
}