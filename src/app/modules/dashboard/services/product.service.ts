import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  protected readonly baseUrl = `${environment.apiHost}/api/admin`;

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(private httpClient: HttpClient, private cookie: CookieService) { }

  getProductListData(pageNumber: number, pageSize: number, search: string): Observable<void> {
    return this.httpClient.get<void>(`${this.baseUrl}/productList?page=${pageNumber}&limit=${pageSize}&search=${search}`, this.getHeaders());
  }

  delete(productId: string): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/deleteProduct/${productId}`, null, this.getHeaders());
  }

  getByOne(productId: string): Observable<void> {
    return this.httpClient.get<void>(`${this.baseUrl}/productGetByOne/${productId}`, this.getHeaders());
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
