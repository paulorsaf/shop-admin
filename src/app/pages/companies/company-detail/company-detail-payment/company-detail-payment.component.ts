import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { Payment } from 'src/app/model/company/company';
import { AppState } from 'src/app/store/app-state';
import { saveCompanyDetailPayment } from '../store/company-detail.actions';

@Component({
  selector: 'app-company-detail-payment',
  templateUrl: './company-detail-payment.component.html',
  styleUrls: ['./company-detail-payment.component.scss']
})
export class CompanyDetailPaymentComponent implements OnInit {

  creditCards: string[] = ["Mastercard", "Visa"];
  paymentForm!: FormGroup;

  isSaving$!: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.isSaving$! = this.store.select(state => state.companyDetail.isSavingPayment);

    this.store
      .select(state => state.companyDetail.company?.payment)
      .pipe(take(1))
      .subscribe(payment => {
        this.createForm(payment);

        this.onTogglePix();
        this.onToggleCreditCard();
      });
  }

  savePayment() {
    this.paymentForm.markAllAsTouched();
    if (this.paymentForm.valid) {
      const payment = {
        ...this.paymentForm.value,
        creditCard: this.paymentForm.value.hasCreditCard ? {
          ...this.paymentForm.value.creditCard,
          flags: this.paymentForm.value.creditCard.flags
            .filter((f: FlagForm) => f.selected)
            .map((f: FlagForm) => f.description)
        } : null
      };
      this.store.dispatch(saveCompanyDetailPayment({payment}));
    }
  }

  toggleFlag(flag: string) {
    const flagsForm = (this.paymentForm.get('creditCard')?.get('flags') as FormArray);
    
    const existingFlags = this.paymentForm.value.creditCard.flags as {value: string}[];
    const indexOfFlag = existingFlags.findIndex(f => f.value === flag);
    if (indexOfFlag >= 0){
      flagsForm.removeAt(indexOfFlag);
    } else {
      flagsForm.push(this.formBuilder.group({value: flag}));
    }
  }

  private createForm(payment?: Payment) {
    this.paymentForm = this.formBuilder.group({
      creditCard: this.formBuilder.group({
        fee: this.formBuilder.group({
          percentage: [payment?.creditCard?.fee?.percentage || 0],
          value: [payment?.creditCard?.fee?.value || 0]
        }),
        flags: this.formBuilder.array(
          this.creditCards.map(c => {
            const hasFlag = payment?.creditCard?.flags?.some(f => f === c) || false;
            return this.formBuilder.group({selected: hasFlag, description: c})
          })
        )
      }),
      hasCreditCard: [payment?.creditCard ? true : false],
      hasPix: [payment?.pixKey ? true : false],
      money: [payment?.money || false],
      pixKey: [payment?.pixKey || ""]
    }, {
      validators: this.creditCardFlagValidator
    });
    this.setFormValidation();
  }

  private creditCardFlagValidator(form: FormControl) {
    const hasCreditCard = form.value.hasCreditCard;
    if (hasCreditCard) {
      if (!form.value.creditCard?.flags?.some((f: FlagForm) => f.selected)) {
        return { required: true };
      }
    }
    return null;
  }

  private onTogglePix() {
    this.paymentForm.get('hasPix')?.valueChanges.subscribe(hasPix => {
      this.setPixValidation(hasPix);
      if (!hasPix) {
        this.paymentForm.get('pixKey')!.setValue('');
      }
    })
  }

  private onToggleCreditCard() {
    this.paymentForm.get('hasCreditCard')?.valueChanges.subscribe(hasCreditCard => {
      this.setCreditCardValidation(hasCreditCard);
      if (!hasCreditCard) {
        this.paymentForm.get('creditCard')?.get('fee')?.get('percentage')!.setValue(0);
        this.paymentForm.get('creditCard')?.get('fee')?.get('value')!.setValue(0);
      }
    })
  }

  private setFormValidation() {
    this.setCreditCardValidation(this.paymentForm.value.hasCreditCard);
    this.setPixValidation(this.paymentForm.value.hasPix);
  }

  private setPixValidation(hasPix: boolean) {
    const pixKey = this.paymentForm.get('pixKey')!;
    if (hasPix) {
      this.addRequiredValidator(pixKey);
    } else {
      this.removeRequiredValidator(pixKey);
    }
  }

  private setCreditCardValidation(hasCreditCard: boolean) {
    const creditCard = this.paymentForm.get('creditCard')!;
    const fee = creditCard.get('fee')!;
    if (hasCreditCard) {
      this.addRequiredValidator(fee.get('percentage')!);
      this.addRequiredValidator(fee.get('value')!);
      this.addRequiredValidator(creditCard.get('flags')!);
    } else {
      this.removeRequiredValidator(fee.get('percentage')!);
      this.removeRequiredValidator(creditCard.get('flags')!);
      (creditCard.get('flags') as FormArray).controls.forEach(c => {
        c.get('selected')?.setValue(false);
      })
    }
  }

  private addRequiredValidator(element: AbstractControl) {
    element.addValidators(Validators.required);
    element.updateValueAndValidity();
  }

  private removeRequiredValidator(element: AbstractControl) {
    element.removeValidators(Validators.required);
    element.updateValueAndValidity();
  }

}

type FlagForm = {
  description: string;
  selected: boolean;
}