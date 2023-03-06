export interface Onboarding {
    userID: string;
    status: string;
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    address: {
        streetName: string;
        buildingNumber: string;
        city: string;
        state: string;
        zip: string;
    };
    phoneNumber: string;
    workPhoneNumber: string;
    carInformation: {
        make: string;
        model: string;
        color: string;
    };
    SSN: string;
    birthday: string;
    gender: string;
    identifyType: {
        visaTitle: string;
        startDate: string;
        endDate: string;
    };
    driversLicense: {
        licenseNumber: string;
        expirationDate: string;
    };
    reference: {
        firstName: string;
        lastName: string;
        middleName: string;
        phoneNumber: string;
        email: string;
        relationship: string;
    };
    emergencyContacts: {
        firstName: string;
        lastName: string;
        middleName: string;
        phoneNumber: string;
        email: string;
        relationship: string;
    };
}
