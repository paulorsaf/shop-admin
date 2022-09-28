import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    get<T>(url: string, params?: any) : Observable<T>{
        return this.http.get<T>(url, {params});
    }

    delete<T>(url: string, params?: any) : Observable<T>{
        return this.http.delete<T>(url);
    }

    post<T>(url: string, body?: any) : Observable<T>{
        return this.http.post<T>(url, body);
    }

    postMultipart<T>(url: string, file: File) : Observable<T>{
        let formData = new FormData();
        formData.append('file', file, file.name);

        return this.http.post<T>(url, formData);
    }

    patch<T>(url: string, body?: any) : Observable<T>{
        return this.http.patch<T>(url, body);
    }

    patchMultipart<T>(url: string, file: File) : Observable<T>{
        let formData = new FormData();
        formData.append('file', file, file.name);

        return this.http.patch<T>(url, formData);
    }

}