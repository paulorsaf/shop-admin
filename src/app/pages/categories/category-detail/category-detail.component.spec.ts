import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { Category } from 'src/app/model/category/category';
import { AppState } from 'src/app/store/app-state';
import { ActivatedRouteMock } from 'src/mock/activated-route.mock';
import { PageMock } from 'src/mock/page.mock';
import { CategoriesModule } from '../categories.module';
import { CategoryDetailComponent } from './category-detail.component';
import { loadDetailSuccess } from './store/category-detail.actions';
import { categoryDetailReducer } from './store/category-detail.reducers';

describe('CategoryDetailComponent', () => {
  let component: CategoryDetailComponent;
  let fixture: ComponentFixture<CategoryDetailComponent>;
  let store: Store<AppState>;
  let activatedRoute: ActivatedRouteMock;
  let page: PageMock;

  beforeEach(async () => {
    activatedRoute = new ActivatedRouteMock();

    await TestBed.configureTestingModule({
      imports: [
        CategoriesModule,
        BrowserAnimationsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('categoryDetail', categoryDetailReducer)
      ]
    })
    .overrideProvider(ActivatedRoute, {useValue: activatedRoute})
    .compileComponents();

    fixture = TestBed.createComponent(CategoryDetailComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();

    activatedRoute.value = '1';
  });

  it('given page starts, then load category by id', done => {
    store.select('categoryDetail').subscribe(state => {
      expect(state.isLoading).toBeTruthy();
      done();
    })
  })

  describe('given is loading category by id', () => {

    it('then show category loader', () => {
      expect(page.querySelector('[test-id="category-loader"]')).not.toBeNull();
    })

    it('then hide category detail', () => {
      expect(page.querySelector('[test-id="category"]')).toBeNull();
    })

  })

  describe('given category by id is loaded', () => {

    beforeEach(() => {
      const category: Category = {id: 1, name: "name"} as any;
      store.dispatch(loadDetailSuccess({category}));
      fixture.detectChanges();
    })

    it('then hide category loader', () => {
      expect(page.querySelector('[test-id="category-loader"]')).toBeNull();
    })

    it('then show category detail', () => {
      expect(page.querySelector('[test-id="category"]')).not.toBeNull();
    })

  })

  describe('given update category', () => {

    beforeEach(() => {
      const category: Category = {id: 1, name: "name"} as any;
      store.dispatch(loadDetailSuccess({category}));
      fixture.detectChanges();
    })

    it('then create form with category detail values', () => {
      expect(component.form.value).toEqual({
        name: "name"
      })
    })

  })

});
