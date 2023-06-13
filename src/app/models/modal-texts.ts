import { ButtonTitle, ConfirmType } from './modal-confirm';

export class ConfirmTexts {
  header?: string;
  message?: string;
}

export class ImportModalTexts {
  header?: string;
  upload?: {
    note: string;
    success: string;
    totalLabel: string;
  };
}

export interface ConfirmationModalText {
  titleAction?: string;
  headerTitle?: string;
  confirmMessage: string;
  descriptionMessage?: string;
  customButtonType?: ButtonTitle;
  confirmType?: ConfirmType;
  item?: string | number;
}

export interface ModalContentStructure {
  titleAction: string;
  headerTitle: string;
  confirmMessage: string;
}
