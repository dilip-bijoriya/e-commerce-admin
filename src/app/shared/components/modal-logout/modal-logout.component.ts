import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-modal-logout',
  templateUrl: './modal-logout.component.html',
  styleUrls: ['./modal-logout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalLogoutComponent {
  constructor(
    public bsModalRef: BsModalRef,
  ) { }

  logout() {
    this.bsModalRef.hide();
  }

  decline() {
    this.bsModalRef.hide();
  }
}
