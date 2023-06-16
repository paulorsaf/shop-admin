import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { BlankComponent } from 'src/mock/blank-component/blank.component.mock';
import { MatDialogMock } from 'src/mock/mat-dialog.mock';
import { MessageServiceMock } from 'src/mock/message-service.mock';
import { PageMock } from 'src/mock/page.mock';
import { CategoriesComponent } from './categories.component';
import { CategoriesModule } from './categories.module';
import { loadCategoriesSuccess, removeCategoryFail, removeCategorySuccess } from './store/categories.actions';
import { categoriesReducer } from './store/categories.reducers';
import { categoryDetailReducer } from './category-detail/store/category-detail.reducers';
import { changeCategoryVisibilityFail, changeCategoryVisibilitySuccess } from './category-detail/store/category-detail.actions';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let store: Store<AppState>;
  let page: PageMock;
  let location: Location;
  let dialog: MatDialogMock;
  let messageService: MessageServiceMock;

  beforeEach(async () => {
    dialog = new MatDialogMock();
    messageService = new MessageServiceMock();

    await TestBed.configureTestingModule({
      imports: [
        CategoriesModule,
        RouterTestingModule.withRoutes([{
          path: "categories/:id", component: BlankComponent
        }]),
        MatDialogModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('categories', categoriesReducer),
        StoreModule.forFeature('categoryDetail', categoryDetailReducer)
      ]
    })
    .overrideProvider(MatDialog, {useValue: dialog})
    .overrideProvider(MessageService, {useValue: messageService})
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
      store.dispatch(loadCategoriesSuccess({categories}));
      fixture.detectChanges();
    })

    it('then hide categories loader', () => {
      expect(page.querySelector('[test-id="categories-loader"]')).toBeNull();
    })

    it('then show categories', () => {
      expect(page.querySelector('[test-id="categories"]')).not.toBeNull();
    })

    it('when categories found, then hide no results found message', () => {
      expect(page.querySelector('[test-id="no-results-found"]')).toBeNull();
    });

    it('when no categories found, then show no results found message', () => {
      const categories = [] as any;
      store.dispatch(loadCategoriesSuccess({categories}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="no-results-found"]')).not.toBeNull();
    });

    it('when click on category, then go to category page', done => {
      page.querySelectorAll('table tbody tr')[0].click();
      fixture.detectChanges();

      setTimeout(() => {
        expect(location.path()).toEqual('/categories/1');
        done();
      }, 100)
    });

    it('when click on add category button, then go to new category page', done => {
      page.querySelector('[test-id="add-category-button"]').click();
      fixture.detectChanges();

      setTimeout(() => {
        expect(location.path()).toEqual('/categories/new');
        done();
      }, 100)
    });

  })

  describe('given user clicks to remove category', () => {

    beforeEach(() => {
      const categories = [{id: 1}, {id: 2}] as any;
      store.dispatch(loadCategoriesSuccess({categories}));
      fixture.detectChanges();
    })

    it('then show confirm dialog', () => {
      page.querySelectorAll('[test-id="remove-category-button"]')[0].click();
      fixture.detectChanges();

      expect(dialog.hasOpened).toBeTruthy();
    })

    describe('when user confirms removal', () => {

      beforeEach(() => {
        dialog.response = "YES";
  
        page.querySelectorAll('[test-id="remove-category-button"]')[0].click();
        fixture.detectChanges();
      })

      it('then show loading', () => {
        expect(page.querySelector('[test-id="categories-loader"]')).not.toBeNull();
      })

      it('then remove', done => {
        store.select('categories').subscribe(state => {
          expect(state.isRemoving).toBeTruthy();
          done();
        })
      })

      it('and category removed with success, then hide loading', () => {
        store.dispatch(removeCategorySuccess());
        fixture.detectChanges();
  
        expect(page.querySelector('[test-id="categories-loader"]')).toBeNull();
      })

      describe('and category removed with error', () => {

        beforeEach(() => {
          store.dispatch(removeCategoryFail({error: "error"}));
          fixture.detectChanges();
        })

        it('then hide loading', () => {
          expect(page.querySelector('[test-id="categories-loader"]')).toBeNull();
        })
  
        it('and category removed with error, then show error', () => {
          expect(messageService._hasShownError).toBeTruthy();
        })

      })

    })

    it('when user cancels removal, then do not remove', done => {
      dialog.response = null;

      page.querySelectorAll('[test-id="remove-category-button"]')[0].click();
      fixture.detectChanges();

      store.select('categories').subscribe(state => {
        expect(state.isRemoving).toBeFalsy();
        done();
      })
    })

  })

  describe('given category visibility toggle', () => {

    describe('when loaded category has visibility as false', () => {

      beforeEach(() => {
        const categories = [{id: 1, isVisible: false}] as any;
        store.dispatch(loadCategoriesSuccess({categories}));
        fixture.detectChanges();
      })

      it('then hide toggle on', () => {
        expect(visibilityToggleOn()).toBeNull();
      })

      it('then show toggle off', () => {
        expect(visibilityToggleOff()).not.toBeNull();
      })

    })

    describe('when loaded category has visibility as true', () => {

      beforeEach(() => {
        const categories = [{id: 1, isVisible: true}] as any;
        store.dispatch(loadCategoriesSuccess({categories}));
        fixture.detectChanges();
      })

      it('then show toggle on', () => {
        expect(visibilityToggleOn()).not.toBeNull();
      })

      it('then hide toggle off', () => {
        expect(visibilityToggleOff()).toBeNull();
      })

    })

  })



  describe('given user clicks on toggle', () => {

    beforeEach(() => {
      const categories = [{id: 1, isVisible: false}] as any;
      store.dispatch(loadCategoriesSuccess({categories}));
      fixture.detectChanges();

      click(visibilityToggle());
    })

    it('then change category visibility', done => {
      store.select('categoryDetail').subscribe(state => {
        expect(state.isChangingVisibility).toBeTruthy();
        done();
      })
    })

    describe('when changing visibility', () => {

      it('then hide visibility toggle', () => {
        expect(visibilityToggle()).toBeNull();
      })
  
      it('then show visibility loader', () => {
        expect(visibilityLoader()).not.toBeNull();
      })

    })

    describe('when visibility changed', () => {

      beforeEach(() => {
        const id = "anyCategoryId";
        store.dispatch(changeCategoryVisibilitySuccess({id}));
        fixture.detectChanges();
      })

      it('then show visibility toggle', () => {
        expect(visibilityToggle()).not.toBeNull();
      })
  
      it('then hide visibility loader', () => {
        expect(visibilityLoader()).toBeNull();
      })

    })

    describe('when error on changing visibility', () => {

      beforeEach(() => {
        const error = {message: "any error message"};
        store.dispatch(changeCategoryVisibilityFail({error}));
        fixture.detectChanges();
      })

      it('then show error message', () => {
        expect(messageService._hasShownError).toBeTruthy();
      })

      it('then show visibility toggle', () => {
        expect(visibilityToggle()).not.toBeNull();
      })
  
      it('then hide visibility loader', () => {
        expect(visibilityLoader()).toBeNull();
      })

    })

  })

  function visibilityToggle() {
    return page.querySelector('[test-id="visibility-toggle"] input');
  }

  function visibilityToggleOn() {
    return page.querySelector('[test-id="visibility-toggle"] [aria-checked="true"]');
  }

  function visibilityToggleOff() {
    return page.querySelector('[test-id="visibility-toggle"] [aria-checked="false"]');
  }

  function visibilityLoader() {
    return page.querySelector('[test-id="visibility-loader"]');
  }

  function click(element: any) {
    element.click();
    fixture.detectChanges();
  }

});
