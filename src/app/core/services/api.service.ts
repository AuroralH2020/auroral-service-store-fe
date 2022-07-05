// Angular imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

// Third-party libraries imports
import { Observable } from 'rxjs';

// Environment import
import { environment } from '@environments/environment';
import { IResponse } from '@shared/interfaces/api.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService<T> {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  list(path: string, tenant?: string): Observable<IResponse<T[]>> {
    return this.http.get(`${this.apiUrl}/${path}`, {
      headers: this.getAuthorization(tenant),
    }) as Observable<IResponse<T[]>>;
  }

  // Keep the id optional because it is necessary for the authenticateUser function of the auth service.
  read(path: string, id?: string, tenant?: string): Observable<IResponse<T>> {
    return this.http.get(`${this.apiUrl}/${path}${id ? '/' + id : ''}`, {
      headers: this.getAuthorization(tenant),
    }) as Observable<IResponse<T>>;
  }

  create(
    path: string,
    body: object,
    tenant?: string
  ): Observable<IResponse<T>> {
    body = this.cleanObjectStrings(body);
    return this.http.post(`${this.apiUrl}/${path}`, body, {
      headers: this.getAuthorization(tenant),
    }) as Observable<IResponse<T>>;
  }

  bulkCreate(
    path: string,
    body: object[],
    tenant?: string
  ): Observable<IResponse<T[]>> {
    body = body.map((b) => this.cleanObjectStrings(b));
    return this.http.post(`${this.apiUrl}/${path}/bulk`, body, {
      headers: this.getAuthorization(tenant),
    }) as Observable<IResponse<T[]>>;
  }

  update(
    path: string,
    id: string,
    body: object,
    tenant?: string
  ): Observable<IResponse<T>> {
    body = this.cleanObjectStrings(body);
    return this.http.patch(`${this.apiUrl}/${path}/${id}`, body, {
      headers: this.getAuthorization(tenant),
    }) as Observable<IResponse<T>>;
  }

  delete(path: string, id: string, tenant?: string): Observable<IResponse<T>> {
    return this.http.delete(`${this.apiUrl}/${path}/${id}`, {
      headers: this.getAuthorization(tenant),
    }) as Observable<IResponse<T>>;
  }

  deleteFiles(
    path: string,
    id: string,
    name: string,
    tenant?: string
  ): Observable<IResponse<T>> {
    return this.http.delete(`${this.apiUrl}/${path}/${id}/files/${name}`, {
      headers: this.getAuthorization(tenant),
    }) as Observable<IResponse<T>>;
  }

  loadImage(url: string, tenant?: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob',
      headers: this.getAuthorization(tenant),
    });
  }

  uploadFiles(
    path: string,
    id: string,
    files: FormData,
    tenant?: string
  ): Observable<IResponse<T>> {
    return this.http.post(`${this.apiUrl}/${path}/${id}/files/upload`, files, {
      headers: this.getAuthorization(tenant),
    }) as Observable<IResponse<T>>;
  }

  readFile(
    path: string,
    id: string,
    uri: string,
    tenant?: string
  ): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${path}/${id}/files/${uri}`, {
      responseType: 'blob',
      headers: this.getAuthorization(tenant),
    }) as Observable<Blob>;
  }

  private getAuthorization(tenant?: string): HttpHeaders {
    const token = localStorage.getItem('token');
    let httpHeaders = new HttpHeaders({
      Authorization: token ? 'Bearer ' + token : '',
    });
    if (tenant) {
      httpHeaders = httpHeaders.set('X-TENANT', tenant);
    }
    return httpHeaders;
  }

  private cleanObjectStrings(object: any): object {
    Object.keys(object).forEach((k) => {
      if (typeof object[k] === 'string') {
        object[k] = object[k].replace(/\s+/g, ' ').trim();
      }
    });
    return object;
  }
}
