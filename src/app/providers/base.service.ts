import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(protected readonly httpClient: HttpClient) {}

  protected getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${environment.api_key}`,
    });
  }

  protected get<T>(url: string): Observable<T> {
    const headers = this.getHeaders();
    return this.httpClient.get<T>(url, { headers });
  }

  protected post<T>(url: string, body: any): Observable<T> {
    const headers = this.getHeaders();
    return this.httpClient.post<T>(url, body, { headers });
  }

  protected patch<T>(url: string, body: any): Observable<T> {
    const headers = this.getHeaders();
    return this.httpClient.patch<T>(url, body, { headers });
  }

  protected delete<T>(url: string): Observable<T> {
    const headers = this.getHeaders();
    return this.httpClient.delete<T>(url, { headers });
  }
}
