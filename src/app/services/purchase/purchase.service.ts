import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api/api.service';
import { Purchase } from 'src/app/model/purchase/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(
    private apiService: ApiService
  ) { }

  find(): Observable<Purchase[]> {
    const url = `${environment.apiUrl}/purchases`;
    return this.apiService.get<Purchase[]>(url);
  }

}
