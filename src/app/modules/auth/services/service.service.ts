import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  protected readonly baseUrl = `${environment.apiHost}/api/admin`;
  constructor(private httpClient: HttpClient) { }

  loginAction(body: any): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/signIn`, body);
  }

  // getDeviceTrayData(orgDeviceId: string): Observable<SoDeviceTrayData> {
  //   return this.httpClient.get<SoDeviceTrayData>(`${this.baseUrl}/trays/devices/${orgDeviceId}`);
  // }
}
