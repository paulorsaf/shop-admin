import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { BlankComponent } from 'src/mock/blank-component/blank.component.mock';
import { PageMock } from 'src/mock/page.mock';
import { AppComponent } from './app.component';
import { AppState } from './store/app-state';
import { verfiyUserIsLoggedFail, verfiyUserIsLoggedSuccess } from './store/user/user.actions';
import { userReducer } from './store/user/user.reducers';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let page: PageMock;
  let store: Store<AppState>;
  let location: Location;

  const user = {id: 1} as any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: "home", component: BlankComponent },
          { path: "login", component: BlankComponent },
          { path: "products", component: BlankComponent },
          { path: "categories", component: BlankComponent }
        ]),
        StoreModule.forRoot([]),
        StoreModule.forFeature('user', userReducer)
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    location = TestBed.inject(Location);
    store = TestBed.inject(Store);
    
    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('given app starts, then verify if user is logged in', done => {
    store.select('user').subscribe(state => {
      expect(state.isVerifyingUserLogged).toBeTruthy();
      done();
    })
  })

  describe('given verifying if user is logged', () => {

    it('then hide app', () => {
      expect(page.querySelector('router-outlet')).toBeNull();
    })

    it('then show app loader', () => {
      expect(page.querySelector('[test-id="app-loader"]')).not.toBeNull();
    })

    describe('when verification is finished with success and user is logged', () => {

      beforeEach(() => {
        spyOn(component, 'isBasePath').and.returnValue(true);

        store.dispatch(verfiyUserIsLoggedSuccess({user}));
        fixture.detectChanges();
      })
  
      it('then show app', () => {
        expect(page.querySelector('router-outlet')).not.toBeNull();
      })
  
      it('then show side menu', () => {
        expect(page.querySelector('mat-drawer')).not.toBeNull();
      })

      it('then hide app loader', () => {
        expect(page.querySelector('[test-id="app-loader"]')).toBeNull();
      })

      it('and current path base path (/), then take user to home page', done => {
        setTimeout(() => {
          expect(location.path()).toEqual('/home');
          done();
        }, 100);
      })

    })

    describe('when verification is finished with error and user is not logged', () => {

      beforeEach(() => {
        store.dispatch(verfiyUserIsLoggedFail());
        fixture.detectChanges();
      })
  
      it('then show app', () => {
        expect(page.querySelector('router-outlet')).not.toBeNull();
      })
  
      it('then hide side menu', () => {
        expect(page.querySelector('mat-drawer')).toBeNull();
      })

      it('then hide app loader', () => {
        expect(page.querySelector('[test-id="app-loader"]')).toBeNull();
      })

      it('then take user to login page', done => {
        setTimeout(() => {
          expect(location.path()).toEqual('/login');
          done();
        }, 100);
      })

    })

  })

  describe('given user is verified and clicks on a menu item', () => {

    beforeEach(() => {
      store.dispatch(verfiyUserIsLoggedSuccess({user}));
      fixture.detectChanges();
    })

    it('given user clicks on logout, then logout', done => {
      page.querySelector('[test-id="logout-button"]').click();
      fixture.detectChanges();
  
      store.select('user').subscribe(state => {
        expect(state.isLoggingOut).toBeTruthy();
        done();
      })
    })
  
    it('given user clicks on products button, then go to products page', done => {
      page.querySelector('[test-id="products-button"]').click();
      fixture.detectChanges();
  
      setTimeout(() => {
        expect(location.path()).toEqual('/products');
        done();
      }, 100);
    })
  
    it('given user clicks on categories button, then go to categories page', done => {
      page.querySelector('[test-id="categories-button"]').click();
      fixture.detectChanges();
  
      setTimeout(() => {
        expect(location.path()).toEqual('/categories');
        done();
      }, 100);
    })

  })
  
});