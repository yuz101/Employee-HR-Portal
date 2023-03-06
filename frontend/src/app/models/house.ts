export interface House {
    _id?: string;
    address: {
      streetName: string;
      buildingNumber: string;
      city: string;
      state: string;
      zip: string;
    };
    landlord: {
      fullName: string;
      phoneNumber: string;
      email: string;
    };
    facility: {
      beds: number;
      mattresses: number;
      tables: number;
      chairs: number;
    };
    residents?: number;
    roommates?: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
    }[];
    reports?: string[];
  }
  export interface HouseResponse {
    message: string;
    house: House;
  }