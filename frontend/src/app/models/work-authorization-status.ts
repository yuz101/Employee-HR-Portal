export enum WorkAuthorizationStatusEnum {
    NOT_UPLOADED = 'Not Uploaded',
    PENDING_FOR_REVIEW = 'Pending for Review',
    APPROVED = 'Approved',
    REJECTED = 'Rejected',
}

export enum WorkAuthorizationDocumentTypeEnum {
    OPT_RECEIPT = 'OPT Receipt',
    OPT_EAD = 'OPT EAD',
    I_20 = 'I-20',
}

export interface EmployeeWorkAuthorizationStatusRecord {
    employeeId: string;
    firstName: string;
    lastName: string;
    middleName: string;
    preferredName: string;
    workAuthorization: string;
    workAuthorizationStatus: WorkAuthorizationStatus;
}

export interface WorkAuthorizationStatus {
    started: boolean;
    completed: boolean;
    documentType: string;
    documentStatus: string;
    feedback: string;
    action: {
        name: string;
    }
}

export interface EmployeeDocumentLink {
    fileName: string;
    downloadUrl: string;
}