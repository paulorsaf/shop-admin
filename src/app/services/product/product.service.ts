import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product/product';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private apiService: ApiService
  ) { }

  find(): Observable<Product[]> {
    const url = `${environment.apiUrl}/products`;
    return this.apiService.get<Product[]>(url);
  }

  findById(id: string): Observable<Product> {
    const url = `${environment.apiUrl}/products/${id}`;
    return this.apiService.get<Product>(url);
  }

  save(product: Product): Observable<Product[]> {
    const url = `${environment.apiUrl}/products`;
    return this.apiService.post<Product[]>(url, product);
  }

  update(product: Product): Observable<Product[]> {
    const url = `${environment.apiUrl}/products/${product.id}`;
    return this.apiService.patch<Product[]>(url, product);
  }

}
