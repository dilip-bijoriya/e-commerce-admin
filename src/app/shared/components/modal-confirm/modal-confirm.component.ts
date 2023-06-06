import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ButtonTitle, ConfirmType, CustomButtonAction, Severity, TextButtonsByType } from 'src/app/models/modal-confirm';
import { CustomModalService } from 'src/app/services/custom-modal/custom-modal.service';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalConfirmComponent implements OnInit {
  customButtonType: ButtonTitle = {} as ButtonTitle;
  customCallback!: Function;

  confirmButtonText!: TextButtonsByType;
  customButtonAction!: CustomButtonAction;

  titleAction!: string;
  headerTitle!: string;
  confirmMessage!: string;
  descriptionMessage!: string;
  descriptionDown?: string;

  confirmType: ConfirmType = ConfirmType.YES_NO;
  severity: Severity = Severity.DANGER;

  onClose$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public bsModalRef: BsModalRef,
    public router: Router,
    protected CustomModalService: CustomModalService
  ) { }

  ngOnInit(): void {

    this.confirmButtonText = {
      [ConfirmType.YES_NO]: { confirm: `Yes`, reject: `Cancel` },
      [ConfirmType.YES_DELETE]: { confirm: `Delete`, reject: `No` },
      [ConfirmType.UPDATE_CANCEL]: { confirm: `Update`, reject: `Cancel` },
      [ConfirmType.CONFIRM_CANCEL]: { confirm: `Confirm`, reject: `Cancel` },
    };
  }

  confirm(): void {
    if (this.confirmType === ConfirmType.CUSTOM) {
      this.customCallback();
    }

    this.CustomModalService.hide(this.bsModalRef.id);
    this.onClose$.next(true);
    // this.bsModalRef.hide();
  }

  decline(): void {
    this.CustomModalService.hide(this.bsModalRef.id);
    this.onClose$.next(false);
    this.bsModalRef.hide();
  }

  get isSingleButton(): boolean {
    return this.confirmType === ConfirmType.BACK;
  }

  get textButtonsByType(): ButtonTitle {
    return this.confirmButtonText[this.confirmType];
  }

  get isDanger(): boolean {
    return this.severity === Severity.DANGER;
  }

  get isWarning(): boolean {
    return this.severity === Severity.WARNING;
  }

  get isInfo(): boolean {
    return this.severity === Severity.INFO;
  }

  get isPrimary(): boolean {
    return this.isWarning || this.isInfo;
  }

  get isCreate(): boolean {
    return this.severity === Severity.INFO;
  }

  get isOkButton(): boolean {
    return this.confirmType === ConfirmType.OK;
  }
}
