import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api/api.service';
import { Cupom } from 'src/app/model/cupom/cupom';

@Injectable({
  providedIn: 'root'
})
export class CupomService {

  constructor(
    private apiService: ApiService
  ) { }

  find(): Observable<Cupom[]> {
    const url = `${environment.apiUrl}/cupoms`;
    return this.apiService.get<Cupom[]>(url);
  }

  save(cupom: Cupom): Observable<void> {
    const url = `${environment.apiUrl}/cupoms`;
    return this.apiService.post<void>(url, cupom);
  }

}
