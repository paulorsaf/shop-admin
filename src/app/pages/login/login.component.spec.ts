import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { BlankComponent } from 'src/mock/blank-component/blank.component.mock';
import { MessageServiceMock } from 'src/mock/message-service.mock';
import { PageMock } from 'src/mock/page.mock';
import { LoginComponent } from './login.component';
import { LoginModule } from './login.module';
import { loginFail, loginSuccess, recoverPasswordFail, recoverPasswordSuccess } from './store/login.actions';
import { loginReducer } from './store/login.reducers';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let page: PageMock;
  let store: Store<AppState>;
  let location: Location;
  let messageService: MessageServiceMock;

  beforeEach(async () => {
    messageService = new MessageServiceMock();

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        LoginModule,
        RouterTestingModule.withRoutes([{
          path: "home", component: BlankComponent
        }]),
        StoreModule.forRoot([]),
        StoreModule.forFeature('login', loginReducer)
      ]
    })
    .overrideProvider(MessageService, {useValue: messageService})
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    store = TestBed.inject(Store);
    location = TestBed.inject(Location);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('given page starts, then create form', () => {
    expect(component.form).not.toBeUndefined();
  });

  describe('given form', () => {

    it('when email field is empty, then email should be invalid', () => {
      component.form.get('email')!.setValue('');
      fixture.detectChanges();
      
      expect(component.form.get('email')!.valid).toBeFalsy();
    })

    it('when email field is invalid, then email should be invalid', () => {
      component.form.get('email')!.setValue('anyValue');
      fixture.detectChanges();
      
      expect(component.form.get('email')!.valid).toBeFalsy();
    })

    it('when email field is valid, then email should be valid', () => {
      component.form.get('email')!.setValue('any@email.com');
      
      expect(component.form.get('email')!.valid).toBeTruthy();
    })

    it('when email is invalid, then recover password button should be disabled', () => {
      component.form.get('email')!.setValue('anyValue');
      fixture.detectChanges();
      
      expect(page.querySelector('[test-id="recover-password-button"]').disabled).toBeTruthy();
    })

    it('when email is valid, then recover password button should be enabled', () => {
      component.form.get('email')!.setValue('any@email.com');
      fixture.detectChanges();
      
      expect(page.querySelector('[test-id="recover-password-button"]').disabled).toBeFalsy();
    })

    it('when password is empty, then password should be invalid', () => {
      component.form.get('password')!.setValue('');
      fixture.detectChanges();
      
      expect(component.form.get('password')!.valid).toBeFalsy();
    })

    it('when password is not empty, then password should be valid', () => {
      component.form.get('password')!.setValue('anyValue');
      fixture.detectChanges();
      
      expect(component.form.get('password')!.valid).toBeTruthy();
    })

    it('when form is invalid, then login button should be disabled', () => {
      component.form.get('email')!.setValue('');
      component.form.get('password')!.setValue('');
      fixture.detectChanges();

      expect(page.querySelector('[test-id="login-button"]').disabled).toBeTruthy();
    })

    describe('when fields are valid', () => {

      beforeEach(() => {
        component.form.get('email')!.setValue('any@email.com');
        component.form.get('password')!.setValue('anyValue');
        fixture.detectChanges();
      })

      it('then form should be valid', () => {
        expect(component.form.valid).toBeTruthy();
      })
  
      it('then login button should be enabled', () => {
        expect(page.querySelector('[test-id="login-button"]').disabled).toBeFalsy();
      })

    })

  })

  describe('given user clicks to login', () => {

    beforeEach(() => {
      component.form.get('email')!.setValue('any@email.com');
      component.form.get('password')!.setValue('anyValue');
      fixture.detectChanges();

      page.querySelector('[test-id="login-button"]').click();
      fixture.detectChanges();
    })

    it('then login', done => {
      store.select('login').subscribe(state => {
        expect(state.isLoggingIn).toBeTruthy();
        done();
      })
    })

    it('then show loader', () => {
      expect(page.querySelector('[test-id="login-loader"]')).not.toBeNull();
    })

    it('then disable recover password button', () => {
      expect(page.querySelector('[test-id="recover-password-button"]').disabled).toBeTruthy();
    })

    describe('when login success', () => {

      beforeEach(() => {
        store.dispatch(loginSuccess({user: {id: 1} as any}));
        fixture.detectChanges();
      })

      it('then hide loader', () => {
        expect(page.querySelector('[test-id="login-loader"]')).toBeNull();
      })

      it('then enable recover password button', () => {
        expect(page.querySelector('[test-id="recover-password-button"]').disabled).toBeFalsy();
      })

      it('then go to home page', done => {
        setTimeout(() => {
          expect(location.path()).toEqual('/home');
          done();
        }, 100)
      })

    })

    describe('when login error', () => {

      beforeEach(() => {
        store.dispatch(loginFail({error: {message: "error"}}));
        fixture.detectChanges();
      })

      it('then hide loader', () => {
        expect(page.querySelector('[test-id="login-loader"]')).toBeNull();
      })

      it('then enable recover password button', () => {
        expect(page.querySelector('[test-id="recover-password-button"]').disabled).toBeFalsy();
      })

      it('then show error', () => {
        expect(messageService._hasShownError).toBeTruthy();
      })

    })

  })

  describe('given user clicks to recover password', () => {

    beforeEach(() => {
      component.form.get('email')!.setValue('any@email.com');
      component.form.get('password')!.setValue('anyPassword');
      fixture.detectChanges();

      page.querySelector('[test-id="recover-password-button"]').click();
      fixture.detectChanges();
    })

    it('then recover password', done => {
      store.select('login').subscribe(state => {
        expect(state.isRecoveringPassword).toBeTruthy();
        done();
      })
    })

    it('then show loader', () => {
      expect(page.querySelector('[test-id="recover-password-loader"]')).not.toBeNull();
    })

    it('then disable login button', () => {
      expect(page.querySelector('[test-id="login-button"]').disabled).toBeTruthy();
    })

    describe('when recover password success success', () => {

      beforeEach(() => {
        store.dispatch(recoverPasswordSuccess());
        fixture.detectChanges();
      })

      it('then hide loader', () => {
        expect(page.querySelector('[test-id="recover-password-loader"]')).toBeNull();
      })

      it('then enable login button', () => {
        expect(page.querySelector('[test-id="login-button"]').disabled).toBeFalsy();
      })

      it('then show success message', () => {
        expect(messageService._hasShownSuccess).toBeTruthy();
      })

    })

    describe('when recover password error', () => {

      beforeEach(() => {
        store.dispatch(recoverPasswordFail({error: {message: "error"}}));
        fixture.detectChanges();
      })

      it('then hide loader', () => {
        expect(page.querySelector('[test-id="recover-password-loader"]')).toBeNull();
      })

      it('then enable login button', () => {
        expect(page.querySelector('[test-id="login-button"]').disabled).toBeFalsy();
      })

      it('then show error', () => {
        expect(messageService._hasShownError).toBeTruthy();
      })

    })

  })

});
