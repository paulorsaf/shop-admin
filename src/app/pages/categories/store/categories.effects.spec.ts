import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { CategoriesEffects } from './categories.effects';
import { EffectsModule } from "@ngrx/effects";
import { provideMockStore } from "@ngrx/store/testing";
import { CategoryServiceMock } from "src/mock/category-service.mock";
import { load, loadFail, loadSuccess } from "./categories.actions";
import { CategoryService } from "src/app/services/category/category.service";

describe('CategoriesEffects', () => {

    let actions$ = new Observable<Action>();
    let effects: CategoriesEffects;
    let categoryService: CategoryServiceMock;

    const categories = [{id: '1'}] as any;
    const error = {error: "error"};

    beforeEach(() => {
        categoryService = new CategoryServiceMock();

        TestBed.configureTestingModule({
            imports: [
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([CategoriesEffects])
            ],
            providers: [
                CategoriesEffects,
                provideMockStore({}),
                provideMockActions(() => actions$)
            ],
        })
        .overrideProvider(CategoryService, {useValue: categoryService});

        effects = TestBed.get(CategoriesEffects);
    })

    describe("Given load", () => {

        beforeEach(() => {
            actions$ = of(load());
        })

        it('when success, then return load success', (done) => {
            categoryService._response = of(categories);
    
            effects.loadEffect$.subscribe(response => {
                expect(response).toEqual(loadSuccess({categories}));
                done();
            })
        })
    
        it('when fail, then return load fail', (done) => {
            categoryService._response = throwError(error);
    
            effects.loadEffect$.subscribe(response => {
                expect(response).toEqual(loadFail({error}));
                done();
            })
        })

    })

});