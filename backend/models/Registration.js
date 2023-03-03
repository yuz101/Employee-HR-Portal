const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const RegistrationSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        token: {type: String, required: true},
        status: {type: String, required: true}
    }, {
        timestamps: true,
    }
)

const Registration = mongoose.model("Registration", RegistrationSchema)
module.exports = Registration;