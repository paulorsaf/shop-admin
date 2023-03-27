import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, Observable, take } from 'rxjs';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { saveServiceTax } from '../store/company-detail.actions';

@Component({
  selector: 'app-service-tax',
  templateUrl: './service-tax.component.html',
  styleUrls: ['./service-tax.component.scss']
})
export class ServiceTaxComponent implements OnInit {

  serviceTaxForm!: FormGroup;

  isSaving$!: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select(state => state.companyDetail.company)
      .pipe(
        filter(company => !!company),
        take(1)
      )
      .subscribe(company => {
        this.serviceTaxForm = this.formBuilder.group({
          serviceTax: [company?.serviceTax, [Validators.required]]
        });
      })

    this.isSaving$ = this.store.select(state => state.companyDetail.isSavingServiceTax);
  }

  save() {
    const serviceTax = this.serviceTaxForm.value.serviceTax;
    this.store.dispatch(saveServiceTax({serviceTax}));

    this.store.select('companyDetail')
      .pipe(
        filter(state => !state.isSavingServiceTax),
        take(1)
      ).subscribe(state => {
        if (state.isSavedServiceTax) {
          this.messageService.showSuccess("Taxa de serviço salva com sucesso");
        }
        if (state.error) {
          this.messageService.showError(state.error.error);
        }
      });
  }

}
