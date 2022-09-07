import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api/api.service';
import { Address } from 'src/app/model/address/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private apiService: ApiService
  ) { }

  findByZipCode(zipCode: string): Observable<Address> {
    const url = `${environment.apiUrl}/address/zipcode/${zipCode.replace(/[^\d]/g, '')}`;
    return this.apiService.get<Address>(url);
  }

}
