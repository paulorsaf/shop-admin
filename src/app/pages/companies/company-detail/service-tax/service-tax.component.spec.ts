import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { MessageServiceMock } from 'src/mock/message-service.mock';
import { PageMock } from 'src/mock/page.mock';
import { saveServiceTaxFail, saveServiceTaxSuccess } from '../store/company-detail.actions';
import { companyDetailReducer } from '../store/company-detail.reducers';
import { ServiceTaxComponent } from './service-tax.component';

describe('ServiceTaxComponent', () => {
  let component: ServiceTaxComponent;
  let fixture: ComponentFixture<ServiceTaxComponent>;
  let store: Store<AppState>;
  let page: PageMock;
  let messageService: MessageServiceMock;

  beforeEach(async () => {
    messageService = new MessageServiceMock();

    await TestBed.configureTestingModule({
      declarations: [
        ServiceTaxComponent
      ],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('companyDetail', companyDetailReducer)
      ]
    })
    .overrideProvider(MessageService, {useValue: messageService})
    .compileComponents();

    fixture = TestBed.createComponent(ServiceTaxComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  describe('given page starts', () => {

    it('then create service tax form', () => {
      expect(component.serviceTaxForm).not.toBeUndefined();
    })

    it('then show save service tax button', () => {
      expect(page.querySelector('[test-id="save-service-tax-button"]')).not.toBeNull();
    })

    it('then hide save service tax loader', () => {
      expect(page.querySelector('[test-id="save-service-tax-loader"]')).toBeNull();
    })

  })

  describe('given form', () => {

    it('when service tax is empty, then service tax should be invalid', () => {
      component.serviceTaxForm.get('serviceTax')!.setValue('');
      fixture.detectChanges();

      expect(component.serviceTaxForm.get('serviceTax')!.valid).toBeFalsy();
    })

    it('when service tax is filled, then service tax should be valid', () => {
      component.serviceTaxForm.get('serviceTax')!.setValue('10');
      fixture.detectChanges();

      expect(component.serviceTaxForm.get('serviceTax')!.valid).toBeTruthy();
    })

    it('when service tax is invalid, then disabled save service tax button', () => {
      component.serviceTaxForm.get('serviceTax')!.setValue('');
      fixture.detectChanges();

      expect(page.querySelector('[test-id="save-service-tax-button"]').disabled).toBeTruthy();
    })

    it('when service tax is valid, then enabled save service tax button', () => {
      component.serviceTaxForm.get('serviceTax')!.setValue('10');
      fixture.detectChanges();

      expect(page.querySelector('[test-id="save-service-tax-button"]').disabled).toBeFalsy();
    })

  })

  describe('given user clicks on save service tax button', () => {

    beforeEach(() => {
      component.serviceTaxForm.get('serviceTax')!.setValue(10);
      fixture.detectChanges();

      page.querySelector('[test-id="save-service-tax-button"]').click();
      fixture.detectChanges();
    })

    it('then save service tax', done => {
      store.select('companyDetail').subscribe(state => {
        expect(state.isSavingServiceTax).toBeTruthy();
        done();
      })
    })

    it('then hide save service tax button', () => {
      expect(page.querySelector('[test-id="save-service-tax-button"]')).toBeNull();
    })

    it('then show service tax loader', () => {
      expect(page.querySelector('[test-id="save-service-tax-loader"]')).not.toBeNull();
    })

    describe('when service tax saved', () => {

      beforeEach(() => {
        store.dispatch(saveServiceTaxSuccess());
        fixture.detectChanges();
      })

      it('then show save service tax button', () => {
        expect(page.querySelector('[test-id="save-service-tax-button"]')).not.toBeNull();
      })
  
      it('then hide service tax loader', () => {
        expect(page.querySelector('[test-id="save-service-tax-loader"]')).toBeNull();
      })

      it('then show success message', done => {
        setTimeout(() => {
          expect(messageService._hasShownSuccess).toBeTruthy();
          done();
        }, 100)
      })

    })

    describe('when error on save service tax', () => {

      beforeEach(() => {
        const error = {message: "error"};
        store.dispatch(saveServiceTaxFail({error}));
        fixture.detectChanges();
      })

      it('then show save service tax button', () => {
        expect(page.querySelector('[test-id="save-service-tax-button"]')).not.toBeNull();
      })
  
      it('then hide service tax loader', () => {
        expect(page.querySelector('[test-id="save-service-tax-loader"]')).toBeNull();
      })

      it('then show success message', done => {
        setTimeout(() => {
          expect(messageService._hasShownError).toBeTruthy();
          done();
        }, 100)
      })

    })

  })

});
