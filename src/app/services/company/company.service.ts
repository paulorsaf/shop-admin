import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api/api.service';
import { Company } from 'src/app/model/company/company';
import { Address } from 'src/app/model/address/address';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private apiService: ApiService
  ) { }

  findById(id: string): Observable<Company> {
    const url = `${environment.apiUrl}/companies/${id}`;
    return this.apiService.get<Company>(url);
  }

  updateAddress(id: string, address: Address): Observable<void> {
    const url = `${environment.apiUrl}/companies/${id}/address`;
    return this.apiService.patch<void>(url, address);
  }

  update(id: string, name: string): Observable<void> {
    const url = `${environment.apiUrl}/companies/${id}`;
    return this.apiService.patch<void>(url, {name});
  }

}
