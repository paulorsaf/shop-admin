import { TestBed } from "@angular/core/testing";
import { Store, StoreModule } from "@ngrx/store";
import { loadCategoriesSuccess } from "src/app/pages/categories/store/categories.actions";
import { categoriesReducer } from "src/app/pages/categories/store/categories.reducers";
import { AppState } from "src/app/store/app-state";
import { CategoryNamePipeModule } from "./category-name.module";
import { CategoryNamePipe } from "./category-name.pipe"

describe('Category name pipe', () => {

    let pipe: CategoryNamePipe;
    let store: Store<AppState>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [
            CategoryNamePipeModule,
            StoreModule.forRoot([]),
            StoreModule.forFeature('categories', categoriesReducer)
          ],
          providers: [
            CategoryNamePipe
          ]
        })
        .compileComponents();
    
        pipe = TestBed.inject(CategoryNamePipe);
        store = TestBed.inject(Store);
    });

    it('given id, when category with that id is not found, then return empty', done => {
        pipe.transform("2").subscribe(value => {
            expect(value).toEqual("");
            done();
        })
    })

    it('given id, when category with that id is found, then return category name', done => {
        store.dispatch(loadCategoriesSuccess({categories: [{id: '2', name: "anyCategoryName"} as any]}))

        pipe.transform("2").subscribe(value => {
            expect(value).toEqual("anyCategoryName");
            done();
        })
    })

})