import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { iif, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Category } from "src/app/model/category/category";
import { CategoryService } from "src/app/services/category/category.service";
import { changeCategoryVisibility, changeCategoryVisibilityFail, changeCategoryVisibilitySuccess, clear, loadDetail, loadDetailFail, loadDetailSuccess, saveDetail, saveDetailFail, saveDetailSuccess } from "./category-detail.actions";
import { updateCategoriesVisibility } from "../../store/categories.actions";

@Injectable()
export class CategoryDetailEffects {

    constructor(
        private categoryService: CategoryService,
        private actions$: Actions
    ){
    }

    loadDetailEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadDetail),
            switchMap((params: {id: string}) =>
                this.categoryService.findById(params.id).pipe(
                    map(category => loadDetailSuccess({category})),
                    catchError(error => of(loadDetailFail({error})))
                )
            )
        )
    )

    saveDetailEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveDetail),
            switchMap((params: {category: Category}) =>
                iif(
                    () => params.category.id === "new",
                    this.categoryService.save(params.category).pipe(
                        map(() => saveDetailSuccess()),
                        catchError(error => of(saveDetailFail({error})))
                    ),
                    this.categoryService.update(params.category).pipe(
                        map(() => saveDetailSuccess()),
                        catchError(error => of(saveDetailFail({error})))
                    )
                )
            )
        )
    )

    saveDetailSuccessEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveDetailSuccess),
            switchMap(() => of(clear()))
        )
    )

    changeVisibilityEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(changeCategoryVisibility),
            switchMap((params: {id: string}) =>
                this.categoryService.changeVisibility(params.id).pipe(
                    map(() => changeCategoryVisibilitySuccess({id: params.id})),
                    catchError(error => of(changeCategoryVisibilityFail({error})))
                )
            )
        )
    )

    changeVisibilitySuccessEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(changeCategoryVisibilitySuccess),
            switchMap((params: {id: string}) =>
                of(updateCategoriesVisibility({id: params.id}))
            )
        )
    )

}