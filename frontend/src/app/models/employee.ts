export interface Employee {
    _id: string;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    middleName: string;
    preferredName?: string;
    ssn?: string;
    workAuthorizationTitle?: string;
    profilePicture: string;
    address: {
      streetName: string;
      buildingNumber: string;
      city: string;
      state: string;
      zip: string;
    };
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
    reference: string;
    emergencyContacts: string[];
    documents: string[];
    visa: string;
    employeeType: string;
    application: string;
    employment: {
      startDate: string;
      endDate: string;
      visaTitle: string;
    };
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    showDetails?: boolean;
  }
  
