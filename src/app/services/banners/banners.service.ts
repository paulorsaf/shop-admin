import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api/api.service';
import { Banner, SaveBanner } from 'src/app/model/banner/banner';

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

  findById(id: string): Observable<Banner> {
    const url = `${environment.apiUrl}/banners/${id}`;
    return this.apiService.get<Banner>(url);
  }

  remove(banner: Banner): Observable<void> {
    const url = `${environment.apiUrl}/banners/${banner.id}`;
    return this.apiService.delete<void>(url);
  }

  save(banner: SaveBanner): Observable<void> {
    const url = `${environment.apiUrl}/banners`;
    return this.apiService.post<void>(url, banner);
  }

  update(banner: SaveBanner): Observable<void> {
    const url = `${environment.apiUrl}/banners/${banner.id}`;
    return this.apiService.patch<void>(url, banner);
  }

}
