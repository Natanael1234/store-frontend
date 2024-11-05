import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl = 'http://localhost:3000/api'; // TODO:

  http: HttpClient = inject(HttpClient);

  post<T>(path: string, data: any): Observable<any> {
    if (!path) {
      throw new Error('Missing request path');
    }
    path.replace(/^\//, '');
    if (path.startsWith('/')) {
      path = path.substring(1);
    }
    const url = `${this.apiUrl}/${path}`;
    return this.http.post<T>(url, data);
  }
}
