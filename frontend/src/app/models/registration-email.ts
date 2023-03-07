export interface RegistrationEmail {
    name: string,
    email: string,
    token: string,
    expiration: Date,
    status: string
}

  export interface RegistrationEmailResponse {
    message: string;
    registrationEmails: RegistrationEmail[];
  }