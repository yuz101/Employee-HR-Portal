export interface RegistrationEmail {
    _id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    token: string;
    expiration: string;
    status: string;
}

export interface RegistrationEmailsResponse {
    message: string;
    registrationEmails: RegistrationEmail[];
}

export interface RegistrationEmailResponse {
    message: string;
    registrationEmail: RegistrationEmail;
}