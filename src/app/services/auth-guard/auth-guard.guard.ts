import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  cookieValue: any;

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise<boolean>(resolve => {
      if (this.cookieService.check("blue_basket")) {
        resolve(true);
      } else {
        this.router.navigateByUrl("/auth/login");
        resolve(false);
      }
    });
  }
}
