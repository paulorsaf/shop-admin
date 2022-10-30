import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api/api.service';
import { AddStock, Stock, UpdateStockOption } from 'src/app/model/product/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private apiService: ApiService
  ) { }

  addStock(productId: string, stock: AddStock): Observable<void> {
    const url = `${environment.apiUrl}/products/${productId}/stocks`;
    return this.apiService.patch<void>(url, stock);
  }

  createStock(productId: string, stock: AddStock): Observable<void> {
    const url = `${environment.apiUrl}/products/${productId}/stocks`;
    return this.apiService.post<void>(url, stock);
  }

  findByProductId(id: string): Observable<Stock[]> {
    const url = `${environment.apiUrl}/products/${id}/stocks`;
    return this.apiService.get<Stock[]>(url);
  }

  removeStockOption(productId: string, stockId: string): Observable<void> {
    const url = `${environment.apiUrl}/products/${productId}/stocks/${stockId}`;
    return this.apiService.delete<void>(url);
  }

  updateStock(): Observable<void> {
    const url = `${environment.apiUrl}/stocks`;
    return this.apiService.patch<void>(url);
  }

  updateStockOption(productId: string, stockOption: UpdateStockOption): Observable<void> {
    const url = `${environment.apiUrl}/products/${productId}/stocks/${stockOption.id}`;
    return this.apiService.patch<void>(url, stockOption);
  }

}
