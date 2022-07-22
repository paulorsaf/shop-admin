import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api/api.service';
import { Banner } from 'src/app/model/banner/banner';

@Injectable({
  providedIn: 'root'
})
export class BannersService {

  constructor(
    private apiService: ApiService
  ) { }

  find(): Observable<Banner[]> {
    const url = `${environment.apiUrl}/banners`;
    return this.apiService.get<Banner[]>(url);
  }

}
