import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category/category';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private apiService: ApiService
  ) { }

  find(): Observable<Category[]> {
    const url = `${environment.apiUrl}/categories`;
    return this.apiService.get<Category[]>(url);
  }

  findById(id: string): Observable<Category> {
    const url = `${environment.apiUrl}/categories/${id}`;
    return this.apiService.get<Category>(url);
  }

  remove(category: Category): Observable<void> {
    const url = `${environment.apiUrl}/categories/${category.id}`;
    return this.apiService.delete<void>(url);
  }

  save(category: Category): Observable<void> {
    const url = `${environment.apiUrl}/categories`;
    return this.apiService.post<void>(url, category);
  }

  update(category: Category): Observable<void> {
    const url = `${environment.apiUrl}/categories/${category.id}`;
    return this.apiService.patch<void>(url, category);
  }

}
