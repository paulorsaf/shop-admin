import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api/api.service';
import { PurchaseSummary } from 'src/app/model/purchase/purchase-summary';
import { Purchase } from 'src/app/model/purchase/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(
    private apiService: ApiService
  ) { }

  find(): Observable<PurchaseSummary[]> {
    const url = `${environment.apiUrl}/purchases`;
    return this.apiService.get<PurchaseSummary[]>(url);
  }

  findById(id: string): Observable<Purchase> {
    const url = `${environment.apiUrl}/purchases/${id}`;
    return this.apiService.get<Purchase>(url);
  }

  sendToSystem(id: string): Observable<Purchase> {
    const url = `${environment.apiUrl}/purchases/${id}/system`;
    return this.apiService.post<Purchase>(url);
  }

  updateStatus(id: string, status: string, reason: string): Observable<Purchase> {
    const url = `${environment.apiUrl}/purchases/${id}/status`;
    return this.apiService.patch<Purchase>(url, {status, reason});
  }

}
