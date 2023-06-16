import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Category } from "src/app/model/category/category";
import { CategoryService } from "src/app/services/category/category.service";
import { loadCategories, loadCategoriesFail, loadCategoriesSuccess, removeCategory, removeCategoryFail, removeCategorySuccess } from "./categories.actions";

@Injectable()
export class CategoriesEffects {

  constructor(
    private categoryService: CategoryService,
    private actions$: Actions
  ){
  }

  loadCategoriesEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCategories),
      switchMap(() =>
        this.categoryService.find().pipe(
          map(categories => loadCategoriesSuccess({categories})),
          catchError(error => of(loadCategoriesFail({error})))
        )
      )
    )
  )

  removeCategoryEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeCategory),
      switchMap((params: {category: Category}) =>
        this.categoryService.remove(params.category).pipe(
          map(() => removeCategorySuccess()),
          catchError(error => of(removeCategoryFail({error})))
        )
      )
    )
  )

  removeCategorySuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeCategorySuccess),
      switchMap(() => of(loadCategories()))
    )
  )

}