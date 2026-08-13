import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

type PostParams = {
  path: string;
  data: any;
  queryParams?: Record<string, any>;
  authorization?: boolean;
};

type GetParams = {
  path: string;
  queryParams?: Record<string, any>;
  authorization?: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl = 'http://localhost:3000/api'; // TODO: move api url to config file

  http: HttpClient = inject(HttpClient);

  post<T>(params: PostParams): Observable<any> {
    const { path, data, queryParams, authorization } = params;
    const url = this.getUrl(path, queryParams);
    const headers = this.getHeaders(!!authorization);
    return this.http.post<T>(url, data, { headers });
  }

  // TODO: test
  patch<T>(params: PostParams): Observable<any> {
    const { path, data, queryParams, authorization } = params;
    const url = this.getUrl(path, queryParams);
    const headers = this.getHeaders(!!authorization);
    return this.http.patch<T>(url, data, { headers });
  }

  get<T>(params: GetParams): Observable<any> {
    const { path, queryParams, authorization } = params;
    const url = this.getUrl(path, queryParams);
    const headers = this.getHeaders(!!authorization);
    return this.http.get<T>(url, { headers });
  }

  private getUrl(path: string, params?: Record<string, any>) {
    if (!path) {
      throw new Error('Missing request path');
    }
    path.replace(/^\//, '');
    if (path.startsWith('/')) {
      path = path.substring(1);
    }
    const queryParams = this.toQueryParams(params);
    const url = `${this.apiUrl}/${path}${queryParams}`;
    return url;
  }

  private toQueryParams(params?: Record<string, any>): string {
    const urlSearchParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((val) => urlSearchParams.append(key, String(val)));
        } else if (value !== undefined && value !== null) {
          urlSearchParams.append(key, String(value));
        }
      });
    }

    const str = urlSearchParams.size ? `?${urlSearchParams.toString()}` : '';
    return str;
  }

  private getHeaders(authorization: boolean) {
    let headers = new HttpHeaders();
    if (authorization) {
      headers = headers.set('Authorization', 'true');
    }
    return headers;
  }
}
