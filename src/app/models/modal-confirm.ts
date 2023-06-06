export enum ConfirmType {
    YES_NO,
    BACK,
    YES_DELETE,
    BACK_PROCEED,
    PROCEED_ABORT,
    PROCEED_CANCEL,
    DELETE_CANCEL,
    BACK_CONTINUE,
    DOWNLOAD_CLOSE,
    TURN_OFF_CLOSE,
    TURN_ON_CLOSE,
    RESET_CANCEL,
    NAV_TO_USRE_PAGE,
    CUSTOM,
    APPROVE_CANCEL,
    REJECT_CANCEL,
    OK,
    CLOSE_ASSIGN,
    CLOSE_UNASSIGN,
    RELEASE_CANCEL,
    REGENERATE_CANCEL,
    UPDATE_LANGUAGE_CANCEL,
    ASSIGN_CANCEL,
    TAKE_ACTION,
    KEEP_UNDEPLOY,
    UPDATE_CANCEL,
    CANCEL_CONTINUE,
    CONFIRM_CANCEL,
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
