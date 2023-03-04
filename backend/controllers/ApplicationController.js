const ApplicationService = require('../services/ApplicationService');

// const application =
// {
//     userID: '63e5ca1801c88ecb8d82f487',
//     status: 'Pending',
//     email: 'example@email.com',
//     firstName: 'John',
//     lastName: 'Doe',
//     middleName: '',
//     preferredName: 'Johnny',
//     profilePicture: 'https://example.com/profilepic.jpg',
//     address: {
//         streetName: 'Main St',
//         buildingNumber: '123',
//         city: 'Anytown',
//         state: 'Anystate',
//         zip: '12345'
//     },
//     phoneNumber: '5551234567',
//     workPhoneNumber: '5552345678',
//     carInformation: {
//         make: 'Toyota',
//         model: 'Camry',
//         color: 'Blue'
//     },
//     SSN: '123456789',
//     birthday: '1990/01/01',
//     gender: 'Male',
//     identifyType: {
//         visaTitle: 'Work Visa',
//         startDate: '2022/01/01',
//         endDate: '2025/01/01'
//     },
//     driversLicense: {
//         licenseNumber: '1234567890',
//         expirationDate: '2026/01/01'
//     },
//     reference: {
//         firstName: 'Jane',
//         lastName: 'Doe',
//         middleName: '',
//         phoneNumber: '5556789012',
//         email: 'janedoe@email.com',
//         relationship: 'Friend'
//     },
//     emergencyContacts: {
//         firstName: 'Jim',
//         lastName: 'Smith',
//         middleName: '',
//         phoneNumber: '5555555555',
//         email: 'jimsmith@email.com',
//         relationship: 'Spouse'
//     }
// };

exports.createNewApplication = async (req, res) => {
    try {
        const newApplication = await ApplicationService.createFile(req.body)
        res.status(200).json({ message: 'create successful' });
    } catch (e) {
        res.status(404).json({ error: error.message });
    }

}

exports.searchByID = async (req, res) => {
    try {
        //下面req.body 需要改成存储于前端的userID（无论是存在cookie里还是哪的）
        const Application = await ApplicationService.getApplicationById(req.body)
        res.status(200).json(Application);
    } catch (e) {
        res.status(404).json({ error: error.message });
    }

}