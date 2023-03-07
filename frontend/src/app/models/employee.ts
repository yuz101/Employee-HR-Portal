export interface Employee {
    username:  string,
    email:  string,
    password:  string, 
    firstName:  string,
    middleName:  string,
    lastName:  string,
    preferredName:  string,
    profilePicture:  string,
    ssn: string,
    address: {
        streetName:  string,
        buildingNumber:  string,
        city:  string,
        state:  string,
        zip:  string
    },
    phoneNumber:  string,
    dateOfBirth:  string,
    gender:  string,
    emergencyContact:
    {
        eFirstName: string;
        eMiddleName: string;
        eLastName: string;
        ePhoneNumber: string;
        eEmail: string;
        eRelationship: string;
    }
    documents: string[],
    employment: {
        startDate:  string,
        endDate:  string,
        visaTitle:  string,
    }
}