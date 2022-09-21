import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api/api.service';
import { Client } from 'src/app/model/user/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private apiService: ApiService
  ) { }

  find(): Observable<Client[]> {
    const url = `${environment.apiUrl}/clients`;
    return this.apiService.get<Client[]>(url);
  }

}
