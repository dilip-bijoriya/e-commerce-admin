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
    }),
  };

  constructor(private httpClient: HttpClient, private cookie: CookieService) { }

  getProductListData(): Observable<void> {
    return this.httpClient.get<void>(`${this.baseUrl}/productList`, this.getHeaders());
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
