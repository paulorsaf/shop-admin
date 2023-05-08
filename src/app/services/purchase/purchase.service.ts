import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  cancelPurchaseProduct(params: CancelPurchaseProduct): Observable<Purchase> {
    const url = `${environment.apiUrl}/purchases/${params.purchaseId}/products/${params.productId}/stocks/${params.stockId}`;
    return this.apiService.delete<Purchase>(url);
  }

  editPurchaseProduct(params: EditPurchaseProduct): Observable<Purchase> {
    const url = `${environment.apiUrl}/purchases/${params.purchaseId}/products/${params.productId}/stocks/${params.stockId}`;
    return this.apiService.post<Purchase>(url, {value: params.value});
  }

  find(): Observable<PurchaseSummary[]> {
    const url = `${environment.apiUrl}/purchases`;
    return this.apiService.get<PurchaseSummary[]>(url);
  }

  findById(id: string): Observable<Purchase> {
    const url = `${environment.apiUrl}/purchases/${id}`;
    return this.apiService.get<Purchase>(url);
  }

  print(id: string): Observable<void> {
    const url = `${environment.apiUrl}/purchases/${id}/print`;
    window.open(url, 'blank');
    return of();
  }

  printAll(): Observable<void> {
    var rows = document.querySelectorAll('table tr');
    const separator = ";";
    var csv = [];
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll('td, th');
        for (var j = 0; j < cols.length; j++) {
            var data = cols[j].textContent?.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ') || "";
            data = data.replace(/"/g, '""');
            row.push('"' + data + '"');
        }
        csv.push(row.join(separator));
    }
    var csv_string = csv.join('\n');
    
    var filename = 'export_' + new Date().toLocaleDateString() + '.csv';
    var link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return of({} as any);
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

type CancelPurchaseProduct = {
  purchaseId: string;
  productId: string;
  stockId: string;
}

type EditPurchaseProduct = {
  purchaseId: string;
  productId: string;
  stockId: string;
  value: number;
}