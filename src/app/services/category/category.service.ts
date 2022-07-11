import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, switchMap } from 'rxjs';
import { Category } from 'src/app/model/category/category';
import { environment } from 'src/environments/environment';

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

  constructor(
    private http: HttpClient
  ) { }

  find(): Observable<Category[]> {
    const url = `${environment.apiUrl}/categories`;
    return this.http.get<Category[]>(url);
  }

  findById(id: string): Observable<Category> {
    const url = `${environment.apiUrl}/categories/${id}`;
    return this.http.get<Category>(url);
  }

  remove(category: Category): Observable<void> {
    const url = `${environment.apiUrl}/categories/${category.id}`;
    return this.http.delete<void>(url);
  }

  save(category: Category): Observable<void> {
    const url = `${environment.apiUrl}/categories`;
    return this.http.post<void>(url, category);
  }

  update(category: Category): Observable<void> {
    const url = `${environment.apiUrl}/categories/${category.id}`;
    return this.http.patch<void>(url, category);
  }

}
