export enum WorkAuthorizationStatusEnum {
    NOT_UPLOADED = 'Not Uploaded',
    PENDING_FOR_REVIEW = 'Pending for Review',
    APPROVED = 'Approved',
    REJECTED = 'Rejected',
}

export enum DocumentTypeEnum {
    PROFILE = 'profile',
}

export enum WorkAuthorizationDocumentTypeEnum{
    OPT_RECEIPT = 'opt-receipt',
    OPT_EAD = 'opt-ead',
    I_20 = 'i-20',
    I_983 = 'i-983',
}

export interface EmployeeCurrentWorkAuthorizationStatusRecord {
    employeeId: string;
    firstName: string;
    lastName: string;
    middleName: string;
    preferredName: string;
    workAuthorization: string;
    workAuthorizationStatus: CurrentWorkAuthorizationStatus;
}

export interface CurrentWorkAuthorizationStatus {
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

export interface EmployeeWorkAuthorizationStatus {
    employeeId: string;
    workAuthorizationType: string;
    started: boolean;
    completed: boolean;
    uploadFlow: RequiredWorkAuthorizationDocument[];
}

export interface RequiredWorkAuthorizationDocument {
    status: WorkAuthorizationStatusEnum;
    documentType: string;
    feedback: string;
}