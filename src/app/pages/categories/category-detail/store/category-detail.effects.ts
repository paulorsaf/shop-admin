import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CategoryService } from "src/app/services/category/category.service";
import { loadDetail, loadDetailFail, loadDetailSuccess } from "./category-detail.actions";

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

}