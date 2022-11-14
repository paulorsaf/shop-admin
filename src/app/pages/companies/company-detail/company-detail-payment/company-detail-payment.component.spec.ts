import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyDetailPaymentComponent } from './company-detail-payment.component';
import { CompaniesModule } from 'src/app/pages/companies/companies.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { companyDetailReducer } from '../store/company-detail.reducers';
import { AppState } from 'src/app/store/app-state';
import { loadCompanyDetailSuccess, saveCompanyDetailPaymentSuccess } from '../store/company-detail.actions';
import { FormArray } from '@angular/forms';
import { PageMock } from 'src/mock/page.mock';
import { MessageServiceMock } from 'src/mock/message-service.mock';
import { MessageService } from 'src/app/services/message/message.service';

describe('CompanyDetailPaymentComponent', () => {
  let component: CompanyDetailPaymentComponent;
  let fixture: ComponentFixture<CompanyDetailPaymentComponent>;
  let store: Store<AppState>;
  let page: PageMock;
  let messageService: MessageServiceMock;

  const company = {
    payment: {
      creditCard: {
        fee: {
          percentage: 2.9,
          value: 1.5
        },
        flags: ['Mastercard', 'Visa']
      },
      isPaymentAfterPurchase: true,
      money: true,
      pixKey: '123.456.789-10'
    }
  } as any;

  beforeEach(async () => {
    messageService = new MessageServiceMock();

    await TestBed.configureTestingModule({
      declarations: [
        CompanyDetailPaymentComponent
      ],
      imports: [
        CompaniesModule,
        BrowserAnimationsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('companyDetail', companyDetailReducer)
      ]
    })
    .overrideProvider(MessageService, {useValue: messageService})
    .compileComponents();

    fixture = TestBed.createComponent(CompanyDetailPaymentComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  });

  it('given component started, then create payment form', () => {
    fixture.detectChanges();

    expect(component.paymentForm).not.toBeUndefined();
  });

  describe('given payment form', () => {

    describe('when company has details', () => {

      beforeEach(() => {
        store.dispatch(loadCompanyDetailSuccess({company}));
        fixture.detectChanges();
      })

      it('when company has details, then populate form', () => {
        expect(component.paymentForm.value).toEqual({
          creditCard: {
            fee: {
              percentage: 2.9,
              value: 1.5
            },
            flags: [
              {selected: true, description: "Mastercard"},
              {selected: true, description: "Visa"}
            ]
          },
          hasCreditCard: true,
          hasPix: true,
          isPaymentAfterPurchase: true,
          money: true,
          pixKey: '123.456.789-10'
        })
      })

      it('then percentage should be required', () => {
        const percentage = component.paymentForm.get('creditCard')?.get('fee')?.get('percentage');
        percentage?.setValue('');

        expect(percentage!.valid).toBeFalsy();
      })

      it('then fee value should be required', () => {
        const value = component.paymentForm.get('creditCard')?.get('fee')?.get('value');
        value?.setValue('');

        expect(value!.valid).toBeFalsy();
      })

      it('then at least one credit card flag should be required', () => {
        const flags = component.paymentForm.get('creditCard')?.get('flags') as FormArray;
        flags.removeAt(0);
        flags.removeAt(0);

        expect(flags!.valid).toBeFalsy();
      })

      it('then pix key should be required', () => {
        const pixKey = component.paymentForm.get('pixKey')!;
        pixKey.setValue('')

        expect(pixKey!.valid).toBeFalsy();
      })

    })

    describe('when company doesnt have details', () => {

      beforeEach(() => {
        store.dispatch(loadCompanyDetailSuccess({company: {} as any}));
        fixture.detectChanges();
      })

      it('then populate form with empty values', () => {
        expect(component.paymentForm.value).toEqual({
          creditCard: {
            fee: {
              percentage: 0,
              value: 0
            },
            flags: [
              {selected: false, description: "Mastercard"},
              {selected: false, description: "Visa"}
            ]
          },
          hasCreditCard: false,
          hasPix: false,
          isPaymentAfterPurchase: false,
          money: false,
          pixKey: ""
        })
      })

      it('then percentage should not be required', () => {
        const percentage = component.paymentForm.get('creditCard')?.get('fee')?.get('percentage');
        percentage?.setValue('');

        expect(percentage!.valid).toBeTruthy();
      })

      it('then fee value should not be required', () => {
        const value = component.paymentForm.get('creditCard')?.get('fee')?.get('value');
        value?.setValue('');

        expect(value!.valid).toBeTruthy();
      })

      it('then at least one credit card flag should not be required', () => {
        const flags = component.paymentForm.get('creditCard')?.get('flags') as FormArray;
        flags.removeAt(0);
        flags.removeAt(0);

        expect(flags!.valid).toBeTruthy();
      })

      it('then pix key should not be required', () => {
        const pixKey = component.paymentForm.get('pixKey')!;
        pixKey.setValue('')

        expect(pixKey!.valid).toBeTruthy();
      })

    })

  })

  describe('given company loaded with payment details', () => {

    beforeEach(() => {
      store.dispatch(loadCompanyDetailSuccess({company}));
      fixture.detectChanges();
    })

    describe('when user unselects pix', () => {

      beforeEach(() => {
        component.paymentForm.get('hasPix')?.setValue(false);
        fixture.detectChanges();
      })

      it('then hide pix key', () => {
        expect(page.querySelector('[test-id="pix-key"]')).toBeNull();
      })

      it('then make pix key value as empty', () => {
        expect(component.paymentForm.value.pixKey).toEqual("");
      })

      it('then pix key should not be mandatory', () => {
        expect(component.paymentForm.get('pixKey')?.valid).toBeTruthy();
      })

    })

    describe('when user unselects credit card', () => {

      beforeEach(() => {
        component.paymentForm.get('hasCreditCard')?.setValue(false);
        fixture.detectChanges();
      })

      it('then hide credit card percentage', () => {
        expect(page.querySelector('[test-id="credit-card-percentage"]')).toBeNull();
      })

      it('then hide credit card fee', () => {
        expect(page.querySelector('[test-id="credit-card-fee"]')).toBeNull();
      })

      it('then make credit card percentage as empty', () => {
        expect(component.paymentForm.value.creditCard.fee.percentage).toEqual(0);
      })

      it('then make credit card fee as empty', () => {
        expect(component.paymentForm.value.creditCard.fee.value).toEqual(0);
      })

      it('then credit card percentage should not be mandatory', () => {
        expect(component.paymentForm.get('creditCard')?.get('fee')?.get('percentage')?.valid).toBeTruthy();
      })

      it('then credit card fee should not be mandatory', () => {
        expect(component.paymentForm.get('creditCard')?.get('fee')?.get('value')?.valid).toBeTruthy();
      })

    })

  })

  describe('given company loaded without payment details', () => {

    beforeEach(() => {
      store.dispatch(loadCompanyDetailSuccess({company: {} as any}));
      fixture.detectChanges();
    })

    describe('when user selects pix', () => {

      beforeEach(() => {
        component.paymentForm.get('hasPix')?.setValue(true);
        fixture.detectChanges();
      })

      it('then show pix key', () => {
        expect(page.querySelector('[test-id="pix-key"]')).not.toBeNull();
      })

      it('then pix key should be mandatory', () => {
        expect(component.paymentForm.get('pixKey')?.valid).toBeFalsy();
      })

    })

    describe('when user selects credit card', () => {

      beforeEach(() => {
        component.paymentForm.get('hasCreditCard')?.setValue(true);
        fixture.detectChanges();
      })

      it('then show credit card percentage', () => {
        expect(page.querySelector('[test-id="credit-card-percentage"]')).not.toBeNull();
      })

      it('then show credit card fee', () => {
        expect(page.querySelector('[test-id="credit-card-fee"]')).not.toBeNull();
      })

      it('then credit card percentage should be mandatory', () => {
        component.paymentForm.get('creditCard')?.get('fee')?.get('percentage')?.setValue('');
        fixture.detectChanges();

        expect(component.paymentForm.get('creditCard')?.get('fee')?.get('percentage')?.valid).toBeFalsy();
      })

      it('then credit card fee should be mandatory', () => {
        component.paymentForm.get('creditCard')?.get('fee')?.get('value')?.setValue('');
        fixture.detectChanges();

        expect(component.paymentForm.get('creditCard')?.get('fee')?.get('value')?.valid).toBeFalsy();
      })

    })

  })

  it('given form is invalid, when user clicks on save button, then do not save payment', done => {
    store.dispatch(loadCompanyDetailSuccess({company}));
    fixture.detectChanges();

    component.paymentForm.get('pixKey')?.setValue('');
    fixture.detectChanges();

    page.querySelector('[test-id="save-payment-button"]').click();
    fixture.detectChanges();

    store.select('companyDetail').subscribe(state => {
      expect(state.isSavingPayment).toBeFalsy();
      done();
    })
  })

  describe('given form is valid and user clicks on save payment button', () => {

    beforeEach(() => {
      store.dispatch(loadCompanyDetailSuccess({company}));
      fixture.detectChanges();

      page.querySelector('[test-id="save-payment-button"]').click();
      fixture.detectChanges();
    })

    it('then save payment', done => {
      store.select('companyDetail').subscribe(state => {
        expect(state.isSavingPayment).toBeTruthy();
        done();
      })
    })

    describe('when saving payment', () => {

      it('then show payment loader', () => {
        expect(page.querySelector('[test-id="payment-loader"]')).not.toBeNull();
      })

      it('then hide save payment button', () => {
        expect(page.querySelector('[test-id="save-payment-button"]')).toBeNull();
      })

    })

    describe('when payment saved', () => {

      beforeEach(() => {
        store.dispatch(saveCompanyDetailPaymentSuccess());
        fixture.detectChanges();
      })

      it('then hide payment loader', () => {
        expect(page.querySelector('[test-id="payment-loader"]')).toBeNull();
      })

      it('then show save payment button', () => {
        expect(page.querySelector('[test-id="save-payment-button"]')).not.toBeNull();
      })

    })

  })

});
