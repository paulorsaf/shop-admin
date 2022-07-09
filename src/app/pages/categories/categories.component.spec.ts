import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { BlankComponent } from 'src/mock/blank-component/blank.component.mock';
import { PageMock } from 'src/mock/page.mock';
import { CategoriesComponent } from './categories.component';
import { CategoriesModule } from './categories.module';
import { loadSuccess } from './store/categories.actions';
import { categoriesReducer } from './store/categories.reducers';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let store: Store<AppState>;
  let page: PageMock;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CategoriesModule,
        RouterTestingModule.withRoutes([{
          path: "categories/:id", component: BlankComponent
        }]),
        StoreModule.forRoot([]),
        StoreModule.forFeature('categories', categoriesReducer)
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    store = TestBed.inject(Store);
    location = TestBed.inject(Location);
    
    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
    
    fixture.detectChanges();
  });

  it('given page starts, then load categories', done => {
    store.select('categories').subscribe(state => {
      expect(state.isLoading).toBeTruthy();
      done();
    })
  });

  describe('given loading categories', () => {

    it('then show categories loader', () => {
      expect(page.querySelector('[test-id="categories-loader"]')).not.toBeNull();
    })

    it('then hide categories', () => {
      expect(page.querySelector('[test-id="categories"]')).toBeNull();
    })

  })

  describe('given categories loaded', () => {

    beforeEach(() => {
      const categories = [{id: 1}, {id: 2}] as any;
      store.dispatch(loadSuccess({categories}));
      fixture.detectChanges();
    })

    it('then hide categories loader', () => {
      expect(page.querySelector('[test-id="categories-loader"]')).toBeNull();
    })

    it('then show categories', () => {
      expect(page.querySelector('[test-id="categories"]')).not.toBeNull();
    })

    it('when click on category, then go to category page', done => {
      page.querySelectorAll('table tbody tr')[0].click();
      fixture.detectChanges();

      setTimeout(() => {
        expect(location.path()).toEqual('/categories/1');
        done();
      }, 100)
    });

  })

});
