import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ModalConfirmComponent } from '../modal-confirm.component';
import { CustomModalService } from 'src/app/services/custom-modal/custom-modal.service';

@Component({
  selector: 'app-modal-confirm-cancel-changes',
  templateUrl: '../modal-confirm.component.html',
  styleUrls: ['../modal-confirm.component.scss'],
})
export class ModalConfirmCancelChangesComponent extends ModalConfirmComponent {
  constructor(
    protected customModalService: CustomModalService,
    public override bsModalRef: BsModalRef,
    public override router: Router,
  ) {
    super(bsModalRef, router, customModalService);
  }

  override decline() {
    this.customModalService.hide(this.bsModalRef.id);
    this.onClose$.next(false);
  }
}
