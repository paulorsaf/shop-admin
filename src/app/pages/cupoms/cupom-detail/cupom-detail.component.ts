import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { format } from 'date-fns';
import { filter, Observable } from 'rxjs';
import { Cupom } from 'src/app/model/cupom/cupom';
import { AppState } from 'src/app/store/app-state';
import { saveCupom } from '../store/cupoms.actions';

@Component({
  selector: 'app-cupom-detail',
  templateUrl: './cupom-detail.component.html',
  styleUrls: ['./cupom-detail.component.scss']
})
export class CupomDetailComponent implements OnInit {

  isSaving$!: Observable<boolean>;

  date: string = format(new Date(), 'yyyy-MM-dd');
  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CupomDetailData,
    private dialogRef: MatDialogRef<CupomDetailComponent>,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.isSaving$ = this.store.select(state => state.cupoms.isSaving);

    this.createForm();

    this.onSaveSuccess();
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.store.dispatch(saveCupom({cupom: {
      ...this.form.value,
      discount: parseFloat(this.form.value.discount)
    }}));
  }

  private createForm() {
    this.form = this.formBuilder.group({
      cupom: [this.data?.cupom?.cupom || '', [Validators.required]],
      discount: [this.data?.cupom?.discount || '', [Validators.required]],
      id: [this.data?.cupom?.id || ''],
      amountLeft: [this.data?.cupom?.amountLeft || '', [Validators.required]],
      expireDate: [this.data?.cupom?.expireDate || '']
    });
  }

  private onSaveSuccess() {
    this.store
      .select(state => state.cupoms.isSaved)
      .pipe(filter(isSaved => isSaved))
      .subscribe(() => {
        this.close();
      })
  }

}

type CupomDetailData = {
  cupom: Cupom;
}