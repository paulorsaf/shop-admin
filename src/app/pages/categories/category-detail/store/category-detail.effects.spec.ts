import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { CategoryDetailEffects } from './category-detail.effects';
import { EffectsModule } from "@ngrx/effects";
import { provideMockStore } from "@ngrx/store/testing";
import { clear, loadDetail, loadDetailFail, loadDetailSuccess, saveDetail, saveDetailFail, saveDetailSuccess } from "./category-detail.actions";
import { CategoryServiceMock } from "src/mock/category-service.mock";
import { CategoryService } from "src/app/services/category/category.service";

describe('CategoryDetailEffects', () => {

    let actions$ = new Observable<Action>();
    let effects: CategoryDetailEffects;
    let categoryService: CategoryServiceMock;

    const category = {id: '1'} as any;
    const error = {error: "error"};

    beforeEach(() => {
        categoryService = new CategoryServiceMock();

        TestBed.configureTestingModule({
            imports: [
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([CategoryDetailEffects])
            ],
            providers: [
                CategoryDetailEffects,
                provideMockStore({}),
                provideMockActions(() => actions$)
            ],
        })
        .overrideProvider(CategoryService, {useValue: categoryService});

        effects = TestBed.get(CategoryDetailEffects);
    })

    describe("Given load detail", () => {

        beforeEach(() => {
            actions$ = of(loadDetail({id: '1'}));
        })

        it('when success, then return load detail success', (done) => {
            categoryService._response = of(category);
    
            effects.loadDetailEffect$.subscribe(response => {
                expect(response).toEqual(loadDetailSuccess({category}));
                done();
            })
        })
    
        it('when fail, then return load detail fail', (done) => {
            categoryService._response = throwError(error);
    
            effects.loadDetailEffect$.subscribe(response => {
                expect(response).toEqual(loadDetailFail({error}));
                done();
            })
        })

    })

    describe("Given save detail", () => {

        beforeEach(() => {
            actions$ = of(saveDetail({category}));
        })

        it('when success, then return save detail success', (done) => {
            categoryService._response = of(category);
    
            effects.saveDetailEffect$.subscribe(response => {
                expect(response).toEqual(saveDetailSuccess());
                done();
            })
        })
    
        it('when fail, then return save detail fail', (done) => {
            categoryService._response = throwError(error);
    
            effects.saveDetailEffect$.subscribe(response => {
                expect(response).toEqual(saveDetailFail({error}));
                done();
            })
        })

    })

    describe("Given save detail success", () => {

        beforeEach(() => {
            actions$ = of(saveDetailSuccess());
        })

        it('then clear category state', (done) => {
            effects.saveDetailSuccessEffect$.subscribe(response => {
                expect(response).toEqual(clear());
                done();
            })
        })

    })

});