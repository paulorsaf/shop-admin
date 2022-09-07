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

  updateLogo(id: string, image: File): Observable<void> {
    return new Observable<void>(observer => {
      this.toBase64(image).then(result => {
        const url = `${environment.apiUrl}/companies/${id}/logos`;
        this.apiService.patch<void>(url, {file: result, name: image.name}).subscribe(() => {
          observer.next();
          observer.complete();
        }, error => {
          observer.error(error);
          observer.complete();
        });
      }).catch(error => {
        observer.error(error);
        observer.complete();
      })
    })
  }

  private toBase64(image: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    })
  }

}