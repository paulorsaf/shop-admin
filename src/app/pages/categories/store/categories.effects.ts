import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CategoryService } from "src/app/services/category/category.service";
import { load, loadFail, loadSuccess } from "./categories.actions";

@Injectable()
export class CategoriesEffects {

  constructor(
    private categoryService: CategoryService,
    private actions$: Actions
  ){
  }

  loadEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(load),
      switchMap(() =>
        this.categoryService.find().pipe(
          map(categories => loadSuccess({categories})),
          catchError(error => of(loadFail({error})))
        )
      )
    )
  )

}