import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ViewEncapsulation } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal-logout',
  templateUrl: './modal-logout.component.html',
  styleUrls: ['./modal-logout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalLogoutComponent {
  constructor(
    public bsModalRef: BsModalRef,
    private cookie: CookieService,
    private router: Router
  ) { }

  logout() {
    try {
      this.cookie.delete("blue_basket")
      this.router.navigateByUrl('/auth/login');
      this.bsModalRef.hide();
    } catch (error) {
      console.log(error);
    }
  }

  decline() {
    this.bsModalRef.hide();
  }
}
