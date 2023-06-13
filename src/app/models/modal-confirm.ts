export enum ConfirmType {
    YES_NO,
    YES_DELETE,
    UPDATE_CANCEL,
    CONFIRM_CANCEL,
    OK
}
export interface TextButtonsByType {
    [key: string]: ButtonTitle;
}

export interface ButtonTitle {
    confirm: string;
    reject: string;
}
