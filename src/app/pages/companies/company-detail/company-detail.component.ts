import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription, take } from 'rxjs';
import { Address } from 'src/app/model/address/address';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { loadAddressByZipCode, loadCompanyDetail, saveCompanyDetail, saveCompanyDetailAddress, saveCompanyDetailLogo } from './store/company-detail.actions';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit, OnDestroy {

  logoStyle$!: Observable<object>;
  isLoading$!: Observable<boolean>;
  isLoadingAddress$!: Observable<boolean>;
  isSaving$!: Observable<boolean>;
  isSavingAddress$!: Observable<boolean>;
  isUploadingLogo$!: Observable<boolean>;

  addressForm!: FormGroup;
  companyForm!: FormGroup;

  companySubscription!: Subscription;
  errorSubscription!: Subscription;
  zipCodeSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.logoStyle$ = this.getLogoStyle();
    this.isLoading$ = this.store.select(state => state.companyDetail.isLoading);
    this.isLoadingAddress$ = this.store.select(state => state.companyDetail.isLoadingAddress);
    this.isSaving$ = this.store.select(state => state.companyDetail.isSavingCompany);
    this.isSavingAddress$ = this.store.select(state => state.companyDetail.isSavingAddress);
    this.isUploadingLogo$ = this.store.select(state => state.companyDetail.isUploadingLogo);

    this.createForm();

    this.store.dispatch(loadCompanyDetail({id: "anyId"}));
    
    this.watchError();
    this.watchCompanyLoaded();
    this.watchZipCodeLoaded();
  }

  ngOnDestroy(): void {
    this.companySubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
    this.zipCodeSubscription.unsubscribe();
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

  findByZipCode() {
    this.store.dispatch(loadAddressByZipCode({zipCode: this.addressForm.value.zipCode}));
  }

  private getLogoStyle() {
    return this.store.select(state => {
      const logo = state.companyDetail.company?.logo?.imageUrl;
      if (logo) {
        return {'background-image': `url(${logo})`};
      }
      return {};
    });;
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
          this.fillAddressForm(company.address);
        }
      })
  }

  private watchZipCodeLoaded() {
    this.zipCodeSubscription = this.store.select('companyDetail')
      .pipe(filter(state => state.isLoadedAddress))
      .subscribe(state => {
        if (state.address) {
          this.fillAddressForm(state.address);
          this.addressForm.markAllAsTouched();
        }
      })
  }

  private fillAddressForm(address: Address) {
    this.addressForm.get('street')?.setValue(address.street);
    this.addressForm.get('number')?.setValue(address.number);
    this.addressForm.get('city')?.setValue(address.city);
    this.addressForm.get('complement')?.setValue(address.complement);
    this.addressForm.get('neighborhood')?.setValue(address.neighborhood);
    this.addressForm.get('state')?.setValue(address.state);
    this.addressForm.get('zipCode')?.setValue(address.zipCode);
  }

}