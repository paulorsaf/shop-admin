import { Injectable } from '@angular/core';
import { delay, Observable, of, switchMap } from 'rxjs';
import { Category } from 'src/app/model/category/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[] = [{
    id: '1',
    name: 'Masculino'
  }, {
    id: '2',
    name: 'Feminino'
  }, {
    id: '3',
    name: 'Infantil'
  }]

  constructor() { }

  find(): Observable<Category[]> {
    return of({})
      .pipe(
        delay(1000),
        switchMap(() => {
          return of(this.categories)
        })
      )
  }

  findById(id: string): Observable<Category> {
    return of({})
      .pipe(
        delay(1000),
        switchMap(() => {
          return of(this.categories.find(p => p.id === id) as Category)
        })
      )
  }

}
