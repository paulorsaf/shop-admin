import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api/api.service';
import { AddStock, Stock } from 'src/app/model/product/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private apiService: ApiService
  ) { }

  findByProductId(id: string): Observable<Stock[]> {
    const url = `${environment.apiUrl}/products/${id}/stocks`;
    return this.apiService.get<Stock[]>(url);
  }

  addStock(productId: string, stock: AddStock): Observable<void> {
    const url = `${environment.apiUrl}/products/${productId}/stocks`;
    return this.apiService.post<void>(url, stock);
  }

}
