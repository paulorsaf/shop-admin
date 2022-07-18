import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private apiService: ApiService
  ) { }

  findByProductId(id: string): Observable<any> {
    const url = `${environment.apiUrl}/products/${id}/stocks`;
    return this.apiService.get<any>(url);
  }

}
