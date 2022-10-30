import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { updateStockReducer } from 'src/app/store/stock/update-stock.reducers';
import { loadUserCompanySuccess, verfiyUserIsLoggedSuccess } from 'src/app/store/user/user.actions';
import { userReducer } from 'src/app/store/user/user.reducers';
import { BlankComponent } from 'src/mock/blank-component/blank.component.mock';
import { PageMock } from 'src/mock/page.mock';
import { SideMenuComponent } from './side-menu.component';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;
  let page: PageMock;
  let store: Store<AppState>;
  let location: Location;

  const user = {id: 1} as any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideMenuComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: "home", component: BlankComponent },
          { path: "login", component: BlankComponent },
          { path: "products", component: BlankComponent },
          { path: "categories", component: BlankComponent },
          { path: "banners", component: BlankComponent },
          { path: "trending", component: BlankComponent },
          { path: "purchases", component: BlankComponent },
          { path: "companies", component: BlankComponent },
          { path: "users", component: BlankComponent },
          { path: "cupoms", component: BlankComponent }
        ]),
        StoreModule.forRoot([]),
        StoreModule.forFeature('user', userReducer),
        StoreModule.forFeature('updateStock', updateStockReducer)
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuComponent);
    location = TestBed.inject(Location);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });


  describe('given user is verified', () => {

    beforeEach(() => {
      store.dispatch(verfiyUserIsLoggedSuccess({user}));
      fixture.detectChanges();
    })

    it('when user clicks on logout, then logout', done => {
      page.querySelector('[test-id="logout-button"]').click();
      fixture.detectChanges();
  
      store.select('user').subscribe(state => {
        expect(state.isLoggingOut).toBeTruthy();
        done();
      })
    })
  
    it('when user clicks on products button, then go to products page', done => {
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
  
    it('when user clicks on banners button, then go to banners page', done => {
      page.querySelector('[test-id="banners-button"]').click();
      fixture.detectChanges();
  
      setTimeout(() => {
        expect(location.path()).toEqual('/banners');
        done();
      }, 100);
    })
  
    it('when user clicks on purchases button, then go to banners page', done => {
      page.querySelector('[test-id="purchases-button"]').click();
      fixture.detectChanges();
  
      setTimeout(() => {
        expect(location.path()).toEqual('/purchases');
        done();
      }, 100);
    })
  
    it('when user clicks on my company button, then go to company page', done => {
      page.querySelector('[test-id="company-button"]').click();
      fixture.detectChanges();
  
      setTimeout(() => {
        expect(location.path()).toEqual('/companies');
        done();
      }, 100);
    })
  
    it('when user clicks on users button, then go to users page', done => {
      page.querySelector('[test-id="users-button"]').click();
      fixture.detectChanges();
  
      setTimeout(() => {
        expect(location.path()).toEqual('/users');
        done();
      }, 100);
    })
  
    it('when user clicks on cupoms button, then go to cupoms page', done => {
      page.querySelector('[test-id="cupoms-button"]').click();
      fixture.detectChanges();
  
      setTimeout(() => {
        expect(location.path()).toEqual('/cupoms');
        done();
      }, 100);
    })

    it('when company can update stock, then show update stock button', () => {
      const company = {canUpdateStock: true} as any;
      store.dispatch(loadUserCompanySuccess({company}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="update-stock-button"]')).toBeTruthy();
    })

    it('when company cannot update stock, then hide update stock button', () => {
      const company = {canUpdateStock: false} as any;
      store.dispatch(loadUserCompanySuccess({company}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="update-stock-button"]')).toBeFalsy();
    })
  
    it('when user clicks on update stock button, then update stock', done => {
      const company = {canUpdateStock: true} as any;
      store.dispatch(loadUserCompanySuccess({company}));
      fixture.detectChanges();

      page.querySelector('[test-id="update-stock-button"]').click();
      fixture.detectChanges();
  
      store.select('updateStock').subscribe(state => {
        expect(state.isUpdating).toBeTruthy();
        done();
      })
    })

  })

});
