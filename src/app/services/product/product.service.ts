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

  find(params: Find): Observable<Product[]> {
    const url = `${environment.apiUrl}/products`;
    return this.apiService.get<Product[]>(url, params);
  }

  findById(id: string): Observable<Product> {
    const url = `${environment.apiUrl}/products/${id}`;
    return this.apiService.get<Product>(url);
  }

  remove(product: Product): Observable<void> {
    const url = `${environment.apiUrl}/products/${product.id}`;
    return this.apiService.delete<void>(url);
  }

  save(product: Product): Observable<Product[]> {
    const url = `${environment.apiUrl}/products`;
    return this.apiService.post<Product[]>(url, product);
  }

  update(product: Product): Observable<Product[]> {
    const url = `${environment.apiUrl}/products/${product.id}`;
    return this.apiService.patch<Product[]>(url, product);
  }

  removeImage(productId: string, imageName: string): Observable<void> {
    const url = `${environment.apiUrl}/products/${productId}/images/${imageName}`;
    return this.apiService.delete<void>(url);
  }

  uploadImage(productId: string, image: File): Observable<void> {
    const url = `${environment.apiUrl}/products/${productId}/images`;
    return this.apiService.postMultipart<void>(url, image);
  }

}

type Find = {
  page?: number;
  internalId: string;
}