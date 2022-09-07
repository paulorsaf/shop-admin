import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription, take } from 'rxjs';
import { Company } from 'src/app/model/company/company';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { loadCompanyDetail, saveCompanyDetail, saveCompanyDetailAddress, saveCompanyDetailLogo } from './store/company-detail.actions';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit, OnDestroy {

  logoStyle$!: Observable<object>;
  isLoading$!: Observable<boolean>;
  isSaving$!: Observable<boolean>;
  isSavingAddress$!: Observable<boolean>;
  isUploadingLogo$!: Observable<boolean>;

  addressForm!: FormGroup;
  companyForm!: FormGroup;

  companySubscription!: Subscription;
  errorSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.logoStyle$ = this.store.select(state => {
      const logo = state.companyDetail.company?.logo?.imageUrl;
      if (logo) {
        return {'background-image': `url(${logo})`};
      }
      return {};
    });
    this.isLoading$ = this.store.select(state => state.companyDetail.isLoading);
    this.isSaving$ = this.store.select(state => state.companyDetail.isSavingCompany);
    this.isSavingAddress$ = this.store.select(state => state.companyDetail.isSavingAddress);
    this.isUploadingLogo$ = this.store.select(state => state.companyDetail.isUploadingLogo);

    this.createForm();

    this.store.dispatch(loadCompanyDetail({id: "anyId"}));
    
    this.watchError();
    this.watchCompanyLoaded();
  }

  ngOnDestroy(): void {
    this.companySubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

  saveAddress() {
    this.store.dispatch(saveCompanyDetailAddress({address: this.addressForm.value}));
  }

  saveCompany() {
    this.store.dispatch(saveCompanyDetail({name: this.companyForm.value.name}));
  }

  uploadLogo($event: any) {
    const file = $event.target.files[0];
    if (file.size > 400000) {
      this.messageService.showAlert('Imagem não pode ser maior do que 400kb');
      return;
    }
    this.store.dispatch(saveCompanyDetailLogo({file}));
    $event.target.value = "";
  }

  private createForm() {
    this.addressForm = this.formBuilder.group({
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      complement: ['', [Validators.required]],
      neighborhood: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]]
    });

    this.companyForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  private watchError() {
    this.errorSubscription = this.store.select(state => state.companyDetail.error)
      .pipe(filter(error => !!error))
      .subscribe(error => {
        this.messageService.showError(error.error);
      })
  }

  private watchCompanyLoaded() {
    this.companySubscription = this.store.select(state => state.companyDetail.company)
      .pipe(
        filter(company => !!company),
        take(1)
      )
      .subscribe(company => {
        this.companyForm.get('name')?.setValue(company?.name);
        if (company?.address) {
          this.addressForm.get('street')?.setValue(company.address.street);
          this.addressForm.get('number')?.setValue(company.address.number);
          this.addressForm.get('city')?.setValue(company.address.city);
          this.addressForm.get('complement')?.setValue(company.address.complement);
          this.addressForm.get('neighborhood')?.setValue(company.address.neighborhood);
          this.addressForm.get('state')?.setValue(company.address.state);
          this.addressForm.get('zipCode')?.setValue(company.address.zipCode);
        }
      })
  }

}
