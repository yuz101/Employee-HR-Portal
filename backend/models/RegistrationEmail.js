const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const RegistrationEmailSchema = new Schema(
    {
        firstName: {type: String, required: true},
        middleName: {type: String, required: true},
        lastName: {type: String, required: true},
        preferredName: {type: String, required: true},
        email: {type: String, required: true},
        token: {type: String, required: true},
        expiration: {type: Date, required: true},
        status: {type: String, required: true}
    }, {
        timestamps: true,
    }
)

const RegistrationEmail = mongoose.model("Registration", RegistrationEmailSchema)
module.exports = RegistrationEmail;