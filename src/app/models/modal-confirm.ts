export enum ConfirmType {
    YES_NO,
    YES_DELETE,
    UPDATE_CANCEL,
    CONFIRM_CANCEL,
    OK
}

export enum Severity {
    DANGER,
    WARNING,
    INFO,
}

export enum CustomButtonAction {
    NAVIGATE,
}

export interface TextButtonsByType {
    [key: string]: ButtonTitle;
}

export interface ButtonTitle {
    confirm: string;
    reject: string;
}
