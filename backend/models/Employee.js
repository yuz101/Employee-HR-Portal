const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const EmployeeSchema = new Schema(
    {
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        firstName: {type: String, required: true},
        middleName: {type: String, required: true},
        lastName: {type: String , required: true} ,
        preferredName: {type: String},
        profilePicture: {type: String},
        ssn:  {type: String},
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
        // reference: {type: refType, ref: "Reference"},
        emergencyContact:
        {
            eFirstName: {type: String},
            eMiddleName: {type: String},
            eLastName: {type: String},
            ePhoneNumber: {type: String},
            eEmail: {type: String},
            eRelationship: {type: String},
        },
        documents: [{type: refType, ref: "Document"}],
        application: {type: refType, ref: "Application"},
        employment: {
            startDate: {type: String},
            endDate: {type: String},
            visaTitle: {type: String},
        },
        isAdmin: {type: Boolean, default: false},
    }, {
        timestamps: true,
    }
)

const Employee = mongoose.model("Employee", EmployeeSchema)
module.exports = Employee;
