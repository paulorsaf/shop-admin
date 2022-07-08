import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private snackbar: MatSnackBar
  ) { }

  showError(error: any) {
    this.snackbar.open(error.message, undefined, {
      duration: 5000
    });
  }

  showSuccess(message: string) {
    this.snackbar.open(message, undefined, {
      duration: 5000
    });
  }

}