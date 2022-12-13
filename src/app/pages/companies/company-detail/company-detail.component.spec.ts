import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Store, StoreModule } from '@ngrx/store';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { MessageServiceMock } from 'src/mock/message-service.mock';
import { PageMock } from 'src/mock/page.mock';
import { CompanyDetailComponent } from './company-detail.component';
import { loadAddressByZipCodeFail, loadAddressByZipCodeSuccess, loadCompanyDetailFail, loadCompanyDetailSuccess, saveCompanyDetail, saveCompanyDetailAboutUsFail, saveCompanyDetailAboutUsSuccess, saveCompanyDetailAddressFail, saveCompanyDetailAddressSuccess, saveCompanyDetailFail, saveCompanyDetailLogoFail, saveCompanyDetailLogoSuccess, saveCompanyDetailSuccess } from './store/company-detail.actions';
import { companyDetailReducer } from './store/company-detail.reducers';

describe('CompanyDetailComponent', () => {
  let component: CompanyDetailComponent;
  let fixture: ComponentFixture<CompanyDetailComponent>;
  let store: Store<AppState>;
  let page: PageMock;
  let messageService: MessageServiceMock;

  const address = {
    street: "anyStreet",
    number: "anyNumber",
    complement: "anyComplement",
    neighborhood: "anyNeighborhood",
    zipCode: "anyZipCode",
    city: "anyCity",
    state: "anyState"
  } as any;

  beforeEach(async () => {
    messageService = new MessageServiceMock();

    await TestBed.configureTestingModule({
      declarations: [ CompanyDetailComponent ],
      imports: [
        ReactiveFormsModule,
        AngularEditorModule,
        HttpClientTestingModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('companyDetail', companyDetailReducer)
      ]
    })
    .overrideProvider(MessageService, {useValue: messageService})
    .compileComponents();

    fixture = TestBed.createComponent(CompanyDetailComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  describe('given page starts', () => {

    it('then load company details', done => {
      store.select('companyDetail').subscribe(state => {
        expect(state.isLoading).toBeTruthy();
        done();
      })
    });

    it('then create about us form', () => {
      expect(component.aboutUsForm).not.toBeUndefined();
    });

    it('then create address form', () => {
      expect(component.addressForm).not.toBeUndefined();
    });

    it('then create company form', () => {
      expect(component.companyForm).not.toBeUndefined();
    });

    it('then create delivery form', () => {
      expect(component.deliveryForm).not.toBeUndefined();
    });

  })

  describe('given address form', () => {

    it('when street is empty, then street should be invalid', () => {
      component.addressForm.get('street')!.setValue('');
      fixture.detectChanges();

      expect(component.addressForm.get('street')!.valid).toBeFalsy();
    })

    it('when street is filled, then street should be valid', () => {
      component.addressForm.get('street')!.setValue('anyStreet');
      fixture.detectChanges();

      expect(component.addressForm.get('street')!.valid).toBeTruthy();
    })

    it('when number is empty, then number should be invalid', () => {
      component.addressForm.get('number')!.setValue('');
      fixture.detectChanges();

      expect(component.addressForm.get('number')!.valid).toBeFalsy();
    })

    it('when number is filled, then number should be valid', () => {
      component.addressForm.get('number')!.setValue('anyNumber');
      fixture.detectChanges();

      expect(component.addressForm.get('number')!.valid).toBeTruthy();
    })

    it('when neighborhood is empty, then neighborhood should be invalid', () => {
      component.addressForm.get('neighborhood')!.setValue('');
      fixture.detectChanges();

      expect(component.addressForm.get('neighborhood')!.valid).toBeFalsy();
    })

    it('when neighborhood is filled, then neighborhood should be valid', () => {
      component.addressForm.get('neighborhood')!.setValue('anyNeighborhood');
      fixture.detectChanges();

      expect(component.addressForm.get('neighborhood')!.valid).toBeTruthy();
    })

    it('when complement is empty, then complement should be invalid', () => {
      component.addressForm.get('complement')!.setValue('');
      fixture.detectChanges();

      expect(component.addressForm.get('complement')!.valid).toBeFalsy();
    })

    it('when complement is filled, then complement should be valid', () => {
      component.addressForm.get('complement')!.setValue('anyComplement');
      fixture.detectChanges();

      expect(component.addressForm.get('complement')!.valid).toBeTruthy();
    })

    it('when zipCode is empty, then zipCode should be invalid', () => {
      component.addressForm.get('zipCode')!.setValue('');
      fixture.detectChanges();

      expect(component.addressForm.get('zipCode')!.valid).toBeFalsy();
    })

    it('when zipCode is filled, then zipCode should be valid', () => {
      component.addressForm.get('zipCode')!.setValue('anyZipCode');
      fixture.detectChanges();

      expect(component.addressForm.get('zipCode')!.valid).toBeTruthy();
    })

    it('when city is empty, then city should be invalid', () => {
      component.addressForm.get('city')!.setValue('');
      fixture.detectChanges();

      expect(component.addressForm.get('city')!.valid).toBeFalsy();
    })

    it('when city is filled, then city should be valid', () => {
      component.addressForm.get('city')!.setValue('anyCity');
      fixture.detectChanges();

      expect(component.addressForm.get('city')!.valid).toBeTruthy();
    })

    it('when state is empty, then state should be invalid', () => {
      component.addressForm.get('state')!.setValue('');
      fixture.detectChanges();

      expect(component.addressForm.get('state')!.valid).toBeFalsy();
    })

    it('when state is filled, then state should be valid', () => {
      component.addressForm.get('state')!.setValue('anyState');
      fixture.detectChanges();

      expect(component.addressForm.get('state')!.valid).toBeTruthy();
    })

  })

  describe('given company form', () => {

    it('when name is empty, then name should be invalid', () => {
      component.companyForm.get('name')!.setValue('');
      fixture.detectChanges();

      expect(component.companyForm.get('name')!.valid).toBeFalsy();
    })

    it('when name is filled, then name should be valid', () => {
      component.companyForm.get('name')!.setValue('anyName');
      fixture.detectChanges();

      expect(component.companyForm.get('name')!.valid).toBeTruthy();
    })

  })

  describe('given delivery form', () => {

    beforeEach(() => {
      const company = {
        aboutUs: "anyHtml",
        address,
        cityDeliveryPrice: 10,
        facebook: "anyFacebook",
        id: "anyCompany",
        instagram: "anyInstagram",
        name: "anyCompanyName",
        website: "anyWebsite",
        whatsapp: "anyWhatsapp"
      } as any;
      store.dispatch(loadCompanyDetailSuccess({company}));
      fixture.detectChanges();
    })

    it('when price is empty, then price should be invalid', () => {
      component.deliveryForm.get('price')!.setValue('');
      fixture.detectChanges();

      expect(component.deliveryForm.get('price')!.valid).toBeFalsy();
    })

    it('when name is filled, then name should be valid', () => {
      component.deliveryForm.get('price')!.setValue('anyName');
      fixture.detectChanges();

      expect(component.deliveryForm.get('price')!.valid).toBeTruthy();
    })

    it('when delivery form is invalid, then disable save delivery button', () => {
      component.deliveryForm.get('price')?.setValue('');
      fixture.detectChanges();

      expect(page.querySelector('[test-id="save-delivery-button"]').disabled).toBeTruthy();
    })

    it('when delivery form is valid, then enable save delivery button', () => {
      component.deliveryForm.get('price')?.setValue('10');
      fixture.detectChanges();

      expect(page.querySelector('[test-id="save-delivery-button"]').disabled).toBeFalsy();
    })

  })

  describe('given loading company', () => {

    it('then show company loader', () => {
      expect(page.querySelector('[test-id="company-loader"]')).not.toBeNull();
    })

    it('then hide company', () => {
      expect(page.querySelector('[test-id="company"]')).toBeNull();
    })

  })

  describe('given company loaded', () => {

    beforeEach(() => {
      const company = {
        aboutUs: "anyHtml",
        address,
        cityDeliveryPrice: 10,
        facebook: "anyFacebook",
        id: "anyCompany",
        instagram: "anyInstagram",
        name: "anyCompanyName",
        website: "anyWebsite",
        whatsapp: "anyWhatsapp"
      } as any;
      store.dispatch(loadCompanyDetailSuccess({company}));
      fixture.detectChanges();
    })

    it('then hide company loader', () => {
      expect(page.querySelector('[test-id="company-loader"]')).toBeNull();
    })

    it('then show company', () => {
      expect(page.querySelector('[test-id="company"]')).not.toBeNull();
    })

    it('then populate address form', () => {
      expect(component.addressForm.value).toEqual(address);
    })

    it('then populate company form', () => {
      expect(component.companyForm.value).toEqual({
        name: "anyCompanyName",
        facebook: "anyFacebook",
        instagram: "anyInstagram",
        website: "anyWebsite",
        whatsapp: "anyWhatsapp"
      });
    })

    it('then populate about us form', () => {
      expect(component.aboutUsForm.value).toEqual({
        html: "anyHtml"
      });
    })

    it('then populate delivery form', () => {
      expect(component.deliveryForm.value).toEqual({
        price: 10
      });
    })

    it('when company form is invalid, then disable save company button', () => {
      component.companyForm.get('name')?.setValue('');
      fixture.detectChanges();

      expect(page.querySelector('[test-id="save-company-button"]').disabled).toBeTruthy();
    })

    it('when address form is invalid, then disable save address button', () => {
      component.addressForm.get('street')?.setValue('');
      fixture.detectChanges();

      expect(page.querySelector('[test-id="save-address-button"]').disabled).toBeTruthy();
    })

    describe('when company is filled with valid inputs', () => {

      beforeEach(() => {
        component.companyForm.get('name')!.setValue('anyName');
        fixture.detectChanges();
      })

      it('then form should be valid', () => {
        expect(component.companyForm.valid).toBeTruthy();
      })

      it('then enable save company button', () => {
        expect(page.querySelector('[test-id="save-company-button"]').disabled).toBeFalsy();
      })

    })

    describe('when address form is filled with valid inputs', () => {

      beforeEach(() => {
        fillAddressForm();
      })

      it('then form should be valid', () => {
        expect(component.addressForm.valid).toBeTruthy();
      })

      it('then enable save address button', () => {
        expect(page.querySelector('[test-id="save-address-button"]').disabled).toBeFalsy();
      })

    })

  })

  describe('given user clicks on save company button', () => {

    beforeEach(() => {
      const company = {id: "anyCompany"} as any;
      store.dispatch(loadCompanyDetailSuccess({company}));
      fixture.detectChanges();

      fillCompanyForm();

      page.querySelector('[test-id="save-company-button"]').click();
      fixture.detectChanges();
    })

    it('then save company', done => {
      store.select('companyDetail').subscribe(state => {
        expect(state.isSavingCompany).toBeTruthy();
        done();
      })
    })

    describe('when saving company', () => {

      it('then show save company loader', () => {
        expect(page.querySelector('[test-id="save-company-loader"]')).not.toBeNull();
      })

      it('then hide save company button', () => {
        expect(page.querySelector('[test-id="save-company-button"]')).toBeNull();
      })

    })

    describe('when company saved', () => {

      beforeEach(() => {
        store.dispatch(saveCompanyDetailSuccess());
        fixture.detectChanges();
      })

      it('then hide save company loader', () => {
        expect(page.querySelector('[test-id="save-company-loader"]')).toBeNull();
      })

      it('then show save company button', () => {
        expect(page.querySelector('[test-id="save-company-button"]')).not.toBeNull();
      })

    })

    describe('when save company failed', () => {

      beforeEach(() => {
        const error = {error: "error"};
        store.dispatch(saveCompanyDetailFail({error}));
        fixture.detectChanges();
      })

      it('then hide save company loader', () => {
        expect(page.querySelector('[test-id="save-company-loader"]')).toBeNull();
      })

      it('then show save company button', () => {
        expect(page.querySelector('[test-id="save-company-button"]')).not.toBeNull();
      })

      it('then show error message', done => {
        setTimeout(() => {
          expect(messageService._hasShownError).toBeTruthy();
          done();
        }, 100)
      })

    })

  })

  describe('given user clicks on save address button', () => {

    beforeEach(() => {
      const company = {id: "anyCompany"} as any;
      store.dispatch(loadCompanyDetailSuccess({company}));
      fixture.detectChanges();

      fillAddressForm();

      page.querySelector('[test-id="save-address-button"]').click();
      fixture.detectChanges();
    })

    it('then save address', done => {
      store.select('companyDetail').subscribe(state => {
        expect(state.isSavingAddress).toBeTruthy();
        done();
      })
    })

    describe('when saving address', () => {

      it('then show save address loader', () => {
        expect(page.querySelector('[test-id="save-address-loader"]')).not.toBeNull();
      })

      it('then hide save address button', () => {
        expect(page.querySelector('[test-id="save-address-button"]')).toBeNull();
      })

    })

    describe('when address saved', () => {

      beforeEach(() => {
        store.dispatch(saveCompanyDetailAddressSuccess());
        fixture.detectChanges();
      })

      it('then hide save address loader', () => {
        expect(page.querySelector('[test-id="save-address-loader"]')).toBeNull();
      })

      it('then show save address button', () => {
        expect(page.querySelector('[test-id="save-address-button"]')).not.toBeNull();
      })

    })

    describe('when save address failed', () => {

      beforeEach(() => {
        const error = {error: "error"};
        store.dispatch(saveCompanyDetailAddressFail({error}));
        fixture.detectChanges();
      })

      it('then hide save address loader', () => {
        expect(page.querySelector('[test-id="save-address-loader"]')).toBeNull();
      })

      it('then show save address button', () => {
        expect(page.querySelector('[test-id="save-address-button"]')).not.toBeNull();
      })

      it('then show error message', done => {
        setTimeout(() => {
          expect(messageService._hasShownError).toBeTruthy();
          done();
        }, 100)
      })

    })

  })

  describe('given error on load company', () => {

    beforeEach(() => {
      const error = {error: "error"} as any;
      store.dispatch(loadCompanyDetailFail({error}));
      fixture.detectChanges();
    })

    it('then show error message', done => {
      setTimeout(() => {
        expect(messageService._hasShownError).toBeTruthy();
        done();
      }, 100)
    })

  })

  describe('given clicks to upload logo', () => {

    beforeEach(() => {
      const company = {id: "anyCompany", name: "anyCompanyName"} as any;
      store.dispatch(loadCompanyDetailSuccess({company}));
      fixture.detectChanges();
    })

    it('when file is larger than 400kb, then do not upload', done => {
      component.uploadLogo({target: {files: [{size: 400001}]}});
      fixture.detectChanges();

      store.select('companyDetail').subscribe(state => {
        expect(state.isUploadingLogo).toBeFalsy();
        done();
      })
    })

    it('when file is lower than 400kb, then do upload', done => {
      component.uploadLogo({target: {files: [{size: 399999}]}});
      fixture.detectChanges();

      store.select('companyDetail').subscribe(state => {
        expect(state.isUploadingLogo).toBeTruthy();
        done();
      })
    })

    describe('when uploading logo', () => {

      beforeEach(() => {
        component.uploadLogo({target: {files: [{size: 399999}]}});
        fixture.detectChanges();
      })

      it('then show logo upload loader', () => {
        expect(page.querySelector('[test-id="logo-upload"]')).not.toBeNull();
      })

      it('then hide logo upload input', () => {
        expect(page.querySelector('[test-id="logo-upload-input"]')).toBeNull();
      })

    })

    describe('when logo uploaded', () => {

      beforeEach(() => {
        component.uploadLogo({target: {files: [{size: 399999}]}});
        fixture.detectChanges();

        store.dispatch(saveCompanyDetailLogoSuccess());
        fixture.detectChanges();
      })

      it('then hide logo upload loader', () => {
        expect(page.querySelector('[test-id="logo-upload"]')).toBeNull();
      })

      it('then show logo upload input', () => {
        expect(page.querySelector('[test-id="logo-upload-input"]')).not.toBeNull();
      })

    })

    describe('when error on logo upload', () => {

      beforeEach(() => {
        component.uploadLogo({target: {files: [{size: 399999}]}});
        fixture.detectChanges();

        store.dispatch(saveCompanyDetailLogoFail({error: "error"}));
        fixture.detectChanges();
      })

      it('then show error message', () => {
        expect(messageService._hasShownError).toBeTruthy();
      })

    })

  })

  describe('given user changes zip code', () => {

    beforeEach(() => {
      const company = {id: "anyCompany"} as any;
      store.dispatch(loadCompanyDetailSuccess({company}));
      fixture.detectChanges();

      component.findByZipCode();
      fixture.detectChanges();
    })

    it('then load address by zip code', done => {
      store.select('companyDetail').subscribe(state => {
        expect(state.isLoadingAddress).toBeTruthy();
        done();
      })
    })

    describe('given loading address', () => {

      it('then show address loader', () => {
        expect(page.querySelector('[test-id="address-loader"]')).not.toBeNull();
      })

      it('then hide zip code', () => {
        expect(page.querySelector('[test-id="zip-code"]')).toBeNull();
      })

    })

    describe('given address loaded', () => {

      beforeEach(() => {
        store.dispatch(loadAddressByZipCodeSuccess({address}));
        fixture.detectChanges();
      })

      it('then hide address loader', () => {
        expect(page.querySelector('[test-id="address-loader"]')).toBeNull();
      })

      it('then show zip code', () => {
        expect(page.querySelector('[test-id="zip-code"]')).not.toBeNull();
      })

      it('then fill address form with address', () => {
        expect(component.addressForm.value).toEqual(address);
      })

    })

    describe('given error on load address', () => {

      beforeEach(() => {
        const error = {error: "error"};
        store.dispatch(loadAddressByZipCodeFail({error}));
        fixture.detectChanges();
      })

      it('then show error message', done => {
        setTimeout(() => {
          expect(messageService._hasShownError).toBeTruthy();
          done();
        }, 100)
      })

    })

  })

  describe('given user clicks to save about us', () => {

    beforeEach(() => {
      const company = {id: "anyCompany"} as any;
      store.dispatch(loadCompanyDetailSuccess({company}));
      fixture.detectChanges();

      page.querySelector('[test-id="save-about-us-button"]').click();
      fixture.detectChanges();
    })

    it('then save about us', done => {
      store.select('companyDetail').subscribe(state => {
        expect(state.isSavingAboutUs).toBeTruthy();
        done();
      })
    })

    describe('when saving', () => {
  
      it('then show about us loader', () => {
        expect(page.querySelector('[test-id="about-us-loader"]')).not.toBeNull();
      })
  
      it('then hide about us save button', () => {
        expect(page.querySelector('[test-id="save-about-us-button"]')).toBeNull();
      })
  
    })

    describe('when saved', () => {

      beforeEach(() => {
        store.dispatch(saveCompanyDetailAboutUsSuccess());
        fixture.detectChanges();
      })
  
      it('then hide about us loader', () => {
        expect(page.querySelector('[test-id="about-us-loader"]')).toBeNull();
      })
  
      it('then show about us save button', () => {
        expect(page.querySelector('[test-id="save-about-us-button"]')).not.toBeNull();
      })
  
    })

    describe('when error on save', () => {

      beforeEach(() => {
        const error = {error: "error"};
        store.dispatch(saveCompanyDetailAboutUsFail({error}));
        fixture.detectChanges();
      })
  
      it('then show error message', done => {
        setTimeout(() => {
          expect(messageService._hasShownError).toBeTruthy();
          done();
        }, 100)
      })
  
    })

  })

  describe('given user clicks on save delivery price', () => {

    beforeEach(() => {
      const company = {id: "anyCompany"} as any;
      store.dispatch(loadCompanyDetailSuccess({company}));
      fixture.detectChanges();

      component.deliveryForm.get('price')?.setValue("10");
      fixture.detectChanges();

      page.querySelector('[test-id="save-delivery-button"]').click();
      fixture.detectChanges();
    })

    it('then save delivery price', done => {
      store.select('companyDetail').subscribe(state => {
        expect(state.isSavingDeliveryPrice).toBeTruthy();
        done();
      })
    })

    describe('when saving delivery price', () => {

      it('then show save delivery price loader', () => {
        expect(page.querySelector('[test-id="save-delivery-loader"]')).not.toBeNull();
      })

      it('then hide save delivery price button', () => {
        expect(page.querySelector('[test-id="save-delivery-button"]')).toBeNull();
      })

    })

  })

  function fillAddressForm() {
    component.addressForm.get('street')!.setValue('any');
    component.addressForm.get('number')!.setValue('any');
    component.addressForm.get('complement')!.setValue('any');
    component.addressForm.get('neighborhood')!.setValue('any');
    component.addressForm.get('state')!.setValue('any');
    component.addressForm.get('city')!.setValue('any');
    component.addressForm.get('zipCode')!.setValue('any');
    fixture.detectChanges();
  }

  function fillCompanyForm() {
    component.companyForm.get('name')!.setValue('any');
    fixture.detectChanges();
  }

});
