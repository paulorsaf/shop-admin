import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api/api.service';
import { DailyPurchaseSummary } from 'src/app/model/purchase-summary/daily-purchase-summary';

@Injectable({
  providedIn: 'root'
})
export class DailySummaryPurchaseService {

  constructor(
    private apiService: ApiService
  ) { }

  find(from: string, until: string): Observable<DailyPurchaseSummary[]> {
    const url = `${environment.apiUrl}/purchases/summaries/daily`;
    return this.apiService.get<DailyPurchaseSummary[]>(url, {from, until}).pipe(
      map(purchases => purchases.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1))
    );
  }

}
