const Employee = require('../models/Employee');
const ObjectAlreadyExistsException = require('../exceptions/ObjectAlreadyExistsException');
const bcrypt = require('bcrypt');
const RegistrationEmail = require('../models/RegistrationEmail');

class AuthService {
     static async signup(username, email, password, firstName, middleName, lastName, preferredName) {
        try {
            const existingUser = await Employee.findOne({
                $or: [
                    { username },
                    { email }
                ]
            })

            if (existingUser) {
                throw new ObjectAlreadyExistsException();
            }

            const hashedPassword = await bcrypt.hash(
                password,
                Number(process.env.SALT)
            )
            const newUser = await Employee.create({
                username: username,
                email: email,
                password: hashedPassword,
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                preferredName: preferredName,
            })

            return newUser
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    static async findRegistrationEmail(emailToken) {
        try {
            const registrationEmail = await RegistrationEmail.findOne({emailToken})
            return registrationEmail
        } catch (err) {
            console.error(err)
            throw err
        }
    }
}

module.exports = AuthService;