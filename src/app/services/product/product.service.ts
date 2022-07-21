import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
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
    return new Observable<void>(observer => {
      this.toBase64(image).then(result => {
        const url = `${environment.apiUrl}/products/${productId}/images`;
        this.apiService.post<void>(url, {file: result, name: image.name}).subscribe(() => {
          observer.next();
          observer.complete();
        }, error => {
          observer.error(error);
          observer.complete();
        });
      }).catch(error => {
        observer.error(error);
        observer.complete();
      })
    })
  }

  private toBase64(image: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    })
  }

}
