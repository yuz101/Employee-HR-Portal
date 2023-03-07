const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const applicationSchema = new Schema(
    {
        userID: { type: refType, required: true },
        status: { type: String, required: true, },
        email: { type: String, required: true },
        firstName: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: function (value) {
                    return /^[a-zA-Z]+$/.test(value);
                },
                message: 'First name should not contain special characters or numbers'
            }
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: function (value) {
                    return /^[a-zA-Z]+$/.test(value);
                },
                message: 'Last name should not contain special characters or numbers'
            }
        },
        middleName: {
            type: String,
            trim: true,
            validate: {
                validator: function (value) {
                    if (!value) return true;
                    return !/^[\s!@#$%^&*()_+=[\]{};:'".,<>/?\\]+$/.test(value);
                },
                message: 'Middle name cannot contain only special characters'
            }
        },
        preferredName: {
            type: String,
            trim: true,
            validate: {
                validator: function (value) {
                    if (!value) return true;
                    return !/^[\s!@#$%^&*()_+=[\]{};:'".,<>/?\\]+$/.test(value);
                },
                message: 'Preferred name cannot contain only special characters'
            }
        },
        profilePicture: { type: String },
        address: {
            streetName: {
                type: String,
                required: true,
                trim: true,
                validate: {
                    validator: function (value) {
                        return !/^[\s!@#$%^&*()_+=[\]{};:'".,<>/?\\]+$/.test(value);
                    },
                    message: 'Street name cannot contain only special characters or spaces'
                }
            },
            buildingNumber: {
                type: String,
                required: true,
                trim: true,
                validate: {
                    validator: function (value) {
                        return !/^[\s!@#$%^&*()_+=[\]{};:'".,<>/?\\]+$/.test(value);
                    },
                    message: 'Building number cannot contain only special characters or spaces'
                }
            },
            city: {
                type: String,
                required: true,
                trim: true,
                validate: {
                    validator: function (value) {
                        return !/^[\s!@#$%^&*()_+=[\]{};:'".,<>/?\\]+$/.test(value);
                    },
                    message: 'City cannot contain only special characters or spaces'
                }
            },
            state: {
                type: String,
                required: true,
                trim: true,
                validate: {
                    validator: function (value) {
                        return !/^[\s!@#$%^&*()_+=[\]{};:'".,<>/?\\]+$/.test(value);
                    },
                    message: 'State cannot contain only special characters or spaces'
                }
            },
            zip: {
                type: String,
                required: true,
                validate: {
                    validator: function (value) {
                        return /^\d+$/.test(value);
                    },
                    message: 'Zip must contain only numbers'
                }
            }
        },
        phoneNumber: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: function (value) {
                    return /^\d+$/.test(value);
                },
                message: 'Phone number must contain only numbers'
            }
        },
        workPhoneNumber: {
            type: String,
            trim: true,
            validate: function (value) {
                if (value == null || value == undefined || value.length === 0) {
                    return true;
                }
                if (/^\d+$/.test(value)) {
                    throw new Error('Work Phone number must contain only numbers');
                }
                return true;
            }
        },
        carInformation: {
            make: { type: String },
            model: { type: String },
            color: { type: String }
        },
        email: { type: String },
        SSN: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: function (value) {
                    return /^\d+$/.test(value);
                },
                message: 'SSN must contain only numbers'
            }
        },
        birthday: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: function (value) {
                    return /^\d{4}-\d{2}-\d{2}$/.test(value);
                },
                message: 'Birthday must be in the format of yyyy-mm-dd'
            }
        },
        gender: { type: String },
        identifyType: {
            visaTitle: {
                type: String,
                required: true,
                trim: true,
                validate: {
                    validator: function (value) {
                        return !/^[\s!@#$%^&*()_+=[\]{};:'".,<>/?\\]+$/.test(value);
                    },
                    message: 'City cannot contain only special characters or spaces'
                }
            },
            startDate: { type: String },
            endDate: { type: String },
        },
        driversLicense: {
            licenseNumber: {
                type: String,
            },
            expirationDate: {
                type: String,
                validate: function (value) {
                    if (value == null || value == undefined || value.length === 0) {
                        return true;
                    }
                    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                        throw new Error('Drivers License date must be in the format of yyyy-mm-dd');
                    }
                    return true;
                }
            }
        },
        reference: {
            firstName: {
                type: String,
                required: true,
                trim: true,
                validate: {
                    validator: function (value) {
                        return /^[a-zA-Z]+$/.test(value);
                    },
                    message: 'First name should not contain special characters or numbers'
                }
            },
            lastName: {
                type: String,
                required: true,
                trim: true,
                validate: {
                    validator: function (value) {
                        return /^[a-zA-Z]+$/.test(value);
                    },
                    message: 'Last name should not contain special characters or numbers'
                }
            },
            middleName: {
                type: String,
                trim: true,
                validate: {
                    validator: function (value) {
                        if (!value) return true;
                        return !/^[\s!@#$%^&*()_+=[\]{};:'".,<>/?\\]+$/.test(value);
                    },
                    message: 'Middle name cannot contain only special characters'
                }
            },
            phoneNumber: {
                type: String,
                required: true,
                trim: true,
                validate: {
                    validator: function (value) {
                        return /^\d+$/.test(value);
                    },
                    message: 'Phone number must contain only numbers'
                }
            },
            email: { type: String, required: true },
            relationship: { type: String, required: true }
        },
        emergencyContacts: {
            firstName: {
                type: String,
                required: true,
                trim: true,
                validate: {
                    validator: function (value) {
                        return /^[a-zA-Z]+$/.test(value);
                    },
                    message: 'First name should not contain special characters or numbers'
                }
            },
            lastName: {
                type: String,
                required: true,
                trim: true,
                validate: {
                    validator: function (value) {
                        return /^[a-zA-Z]+$/.test(value);
                    },
                    message: 'Last name should not contain special characters or numbers'
                }
            },
            middleName: {
                type: String,
                trim: true,
                validate: {
                    validator: function (value) {
                        if (!value) return true;
                        return !/^[\s!@#$%^&*()_+=[\]{};:'".,<>/?\\]+$/.test(value);
                    },
                    message: 'Middle name cannot contain only special characters'
                }
            },
            phoneNumber: {
                type: String,
                required: true,
                trim: true,
                validate: {
                    validator: function (value) {
                        return /^\d+$/.test(value);
                    },
                    message: 'Phone number must contain only numbers'
                }
            },
            email: { type: String, required: true },
            relationship: { type: String, required: true }
        }
    }

)

const Application = mongoose.model("Apllication", applicationSchema)
module.exports = Application;