import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  protected readonly baseUrl = `${environment.apiHost}/api/admin`;

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(private httpClient: HttpClient, private cookie: CookieService) { }

  createCustomer(payload: any): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/create/customer`, payload, this.getHeaders());
  }

  updateCustomer(payload: any, customerId: string): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/update/${customerId}`, payload, this.getHeaders());
  }

  getCustomerListData(pageNumber: number, pageSize: number, search: string): Observable<void> {
    return this.httpClient.get<void>(`${this.baseUrl}/customer?page=${pageNumber}&limit=${pageSize}&search=${search}`, this.getHeaders());
  }

  delete(customerId: string): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/delete/customer/${customerId}`, null, this.getHeaders());
  }

  getByOne(customerId: string): Observable<void> {
    return this.httpClient.get<void>(`${this.baseUrl}/getByOne/${customerId}`, this.getHeaders());
  }

  getHeaders() {
    if (this.cookie.check('blue_basket')) {
      const user = JSON.parse(this.cookie.get('blue_basket'));
      this.httpOptions = {
        headers: new HttpHeaders({
          'authorization': 'Bearer ' + user.response.token
        })
      };
    }
    return this.httpOptions
  }
}
