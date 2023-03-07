export interface RegistrationEmail {
    _id: string,
    firstName: string,
    middleName: string,
    lastName: string,
    preferredName: string,
    email: string,
    token: string,
    expiration: string,
    status: string
}

  export interface RegistrationEmailResponse {
    message: string;
    registrationEmails: RegistrationEmail[];
  }