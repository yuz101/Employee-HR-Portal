const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const EmployeeSchema = new Schema(
    {
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        firstName: {type: String},
        lastName: {type: String},
        middleName: {type: String},
        preferredName: {type: String},
        profilePicture: {type: String},
        address: {
            streetName: {type: String},
            buildingNumber: {type: String},
            city: {type: String},
            state: {type: String},
            zip: {type: String}
        },
        phoneNumber: {type: String},
        dateOfBirth: {type: String},
        gender: {type: String},
        reference: {type: refType, ref: "Reference"},
        emergencyContacts: [{type: refType, ref: "EmergencyContact"}],
        documents: [{type: refType, ref: "Document"}],
        visa: {type: refType, ref: "Visa"},
        employeeType: {type: String},
        application: {type: refType, ref: "Application"},
        employment: {
            startDate: {type: String},
            endDate: {type: String},
            visaTitle: {type: String},
        }
    }, {
        timestamps: true,
    }
)

const Employee = mongoose.model("Employee", EmployeeSchema)
module.exports = Employee;