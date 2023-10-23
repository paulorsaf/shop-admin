import { Injectable } from '@angular/core';
import { Observable, from, switchMap } from 'rxjs';
import { Product } from 'src/app/model/product/product';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api/api.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private apiService: ApiService,
    private storage: AngularFireStorage
  ) { }

  changeVisibility(productId: string): Observable<void> {
    const url = `${environment.apiUrl}/products/${productId}/visibilities`;
    return this.apiService.patch<void>(url);
  }

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

  removeImage(productId: string, imageName: string): Observable<void> {
    const url = `${environment.apiUrl}/products/${productId}/images/${imageName}`;
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

  uploadImage(productId: string, image: File): Observable<void> {
    const url = `${environment.apiUrl}/products/${productId}/images`;
    return this.apiService.postMultipart<void>(url, image);
  }

  uploadProducts(file: File): Observable<void> {
    const path = `products/uploads/${file.name}`;
    return from(this.storage.upload(path, file))
      .pipe(switchMap(() => {
        const url = `${environment.apiUrl}/products/uploads`;
        return this.apiService.post<void>(url, {path});
      }))
  }

}

type Find = {
  page?: number;
  internalId: string;
  categoryId: string;
}