import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalLogoutComponent } from '../modal-logout/modal-logout.component';
import { ConfirmationModalText } from 'src/app/models/modal-texts';
import { ConfirmType } from 'src/app/models/modal-confirm';
import { filter } from 'rxjs';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { CustomModalService } from 'src/app/services/custom-modal/custom-modal.service';
import { ViewEncapsulation } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  bsModalRef!: BsModalRef;
  count: number = 2;

  constructor(
    private CustomModalService: CustomModalService,
    private cookie: CookieService,
    private router: Router
  ) { }

  logOut() {
    this.bsModalRef = this.CustomModalService.show(ModalLogoutComponent, {
      ignoreBackdropClick: false
    });
  }

  get confirmationText(): ConfirmationModalText {
    const confirmModalText: ConfirmationModalText = {
      titleAction: 'Product Update',
      descriptionMessage: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
      confirmMessage: 'Are you sure you want to proceed?',
      confirmType: ConfirmType.YES_NO,
    };
    return confirmModalText;
  }

  confirmModel(): void {
    const confirmModalText: ConfirmationModalText = this.confirmationText;
    this.bsModalRef = this.CustomModalService.show(ModalConfirmComponent, {
      initialState: confirmModalText,
      class: 'modal-dialog--xs',
      ignoreBackdropClick: false
    });
    this.bsModalRef.content.onClose$
      .pipe(
        filter((result: boolean) => result)
      )
      .subscribe({
        next: () => {
          this.bsModalRef.hide();
        },
        error: () => {
        }
      });
  }
}
