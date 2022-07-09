import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Category } from "src/app/model/category/category";
import { CategoryService } from "src/app/services/category/category.service";
import { clear, loadDetail, loadDetailFail, loadDetailSuccess, saveDetail, saveDetailFail, saveDetailSuccess } from "./category-detail.actions";

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
                this.categoryService.save(params.category).pipe(
                    map(() => saveDetailSuccess()),
                    catchError(error => of(saveDetailFail({error})))
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

}