import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { Category } from 'src/app/model/category/category';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { ActivatedRouteMock } from 'src/mock/activated-route.mock';
import { MessageServiceMock } from 'src/mock/message-service.mock';
import { PageMock } from 'src/mock/page.mock';
import { CategoriesModule } from '../categories.module';
import { CategoryDetailComponent } from './category-detail.component';
import { loadDetailSuccess, saveDetailFail, saveDetailSuccess } from './store/category-detail.actions';
import { categoryDetailReducer } from './store/category-detail.reducers';

describe('CategoryDetailComponent', () => {
  let component: CategoryDetailComponent;
  let fixture: ComponentFixture<CategoryDetailComponent>;
  let store: Store<AppState>;
  let activatedRoute: ActivatedRouteMock;
  let page: PageMock;
  let messageService: MessageServiceMock;

  beforeEach(async () => {
    activatedRoute = new ActivatedRouteMock();
    messageService = new MessageServiceMock();

    await TestBed.configureTestingModule({
      imports: [
        CategoriesModule,
        BrowserAnimationsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('categoryDetail', categoryDetailReducer)
      ]
    })
    .overrideProvider(ActivatedRoute, {useValue: activatedRoute})
    .overrideProvider(MessageService, {useValue: messageService})
    .compileComponents();

    fixture = TestBed.createComponent(CategoryDetailComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    activatedRoute.value = '1';
  });

  it('given page starts, then load category by id', done => {
    fixture.detectChanges();

    store.select('categoryDetail').subscribe(state => {
      expect(state.isLoading).toBeTruthy();
      done();
    })
  })

  describe('given is loading category by id', () => {

    beforeEach(() => {
      fixture.detectChanges();
    })

    it('then show category loader', () => {
      expect(page.querySelector('[test-id="category-loader"]')).not.toBeNull();
    })

    it('then hide category detail', () => {
      expect(page.querySelector('[test-id="category"]')).toBeNull();
    })

  })

  describe('given category by id is loaded', () => {

    beforeEach(() => {
      fixture.detectChanges();

      dispatchLoadDetailSuccess();
    })

    it('then hide category loader', () => {
      expect(page.querySelector('[test-id="category-loader"]')).toBeNull();
    })

    it('then show category detail', () => {
      expect(page.querySelector('[test-id="category"]')).not.toBeNull();
    })

    it('when name is empty, then name should be invalid', () => {
      component.form.get('name')?.setValue('');
      fixture.detectChanges();

      expect(component.form.get('name')?.valid).toBeFalsy();
    })

    it('when form is invalid, then disable save button', () => {
      component.form.get('name')?.setValue('');
      fixture.detectChanges();

      expect(page.querySelector('[test-id="save-button"]').disabled).toBeTruthy();
    })

    it('when form is valid, then enable save button', () => {
      component.form.get('name')?.setValue('any name');
      fixture.detectChanges();

      expect(page.querySelector('[test-id="save-button"]').disabled).toBeFalsy();
    })

  })

  describe('given new category', () => {

    beforeEach(() => {
      activatedRoute.value = "new";
      fixture.detectChanges();
    })

    it('then create form with category detail empty values', () => {
      expect(component.form.value).toEqual({
        name: ""
      })
    })

  })

  describe('given update category', () => {

    beforeEach(() => {
      fixture.detectChanges();

      dispatchLoadDetailSuccess();
    })

    it('then create form with category detail values', () => {
      expect(component.form.value).toEqual({
        name: "name"
      })
    })

  })

  describe('given user clicks on save button', () => {

    beforeEach(() => {
      fixture.detectChanges();

      dispatchLoadDetailSuccess();

      component.form.get('name')?.setValue('any name');
      fixture.detectChanges();

      page.querySelector('[test-id="save-button"]').click();
      fixture.detectChanges();
    });

    it('then save', done => {
      store.select('categoryDetail').subscribe(state => {
        expect(state.isSaving).toBeTruthy();
        done();
      })
    })

    it('when saving, then show save loader', () => {
      expect(page.querySelector('[test-id="save-loader"]')).not.toBeNull();
    })

    it('when saved with success, then hide save loader', () => {
      store.dispatch(saveDetailSuccess());
      fixture.detectChanges();

      expect(page.querySelector('[test-id="save-loader"]')).toBeNull();
    })

    describe('when error on save', () => {

      beforeEach(() => {
        store.dispatch(saveDetailFail({error: {message: "error"}}));
        fixture.detectChanges();
      })

      it('then show error message', () => {
        expect(messageService._hasShownError).toBeTruthy();
      })

      it('then hide save loader', () => {
        expect(page.querySelector('[test-id="save-loader"]')).toBeNull();
      })

    })

  })

  function dispatchLoadDetailSuccess() {
    const category: Category = {id: 1, name: "name"} as any;
    store.dispatch(loadDetailSuccess({category}));
    fixture.detectChanges();
  }

});
