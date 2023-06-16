import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { CategoriesEffects } from './categories.effects';
import { EffectsModule } from "@ngrx/effects";
import { provideMockStore } from "@ngrx/store/testing";
import { CategoryServiceMock } from "src/mock/category-service.mock";
import { loadCategories, loadCategoriesFail, loadCategoriesSuccess, removeCategory, removeCategoryFail, removeCategorySuccess } from "./categories.actions";
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
            actions$ = of(loadCategories());
        })

        it('when success, then return load success', (done) => {
            categoryService._response = of(categories);
    
            effects.loadCategoriesEffect$.subscribe(response => {
                expect(response).toEqual(loadCategoriesSuccess({categories}));
                done();
            })
        })
    
        it('when fail, then return load fail', (done) => {
            categoryService._response = throwError(error);
    
            effects.loadCategoriesEffect$.subscribe(response => {
                expect(response).toEqual(loadCategoriesFail({error}));
                done();
            })
        })

    })

    describe("Given remove", () => {

        beforeEach(() => {
            const category = {id: 1} as any;
            actions$ = of(removeCategory({category}));
        })

        it('when success, then return remove success', (done) => {
            categoryService._response = of(categories);
    
            effects.removeCategoryEffect$.subscribe(response => {
                expect(response).toEqual(removeCategorySuccess());
                done();
            })
        })
    
        it('when fail, then return load fail', (done) => {
            categoryService._response = throwError(error);
    
            effects.removeCategoryEffect$.subscribe(response => {
                expect(response).toEqual(removeCategoryFail({error}));
                done();
            })
        })

    })

    describe("Given remove success", () => {

        beforeEach(() => {
            actions$ = of(removeCategorySuccess());
        })

        it('then return load', (done) => {
            effects.removeCategorySuccessEffect$.subscribe(response => {
                expect(response).toEqual(loadCategories());
                done();
            })
        })

    })

});