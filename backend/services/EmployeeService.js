const Employee = require('../models/Employee');
const ObjectAlreadyExistsException = require('../exceptions/ObjectAlreadyExistsException');
const bcrypt = require('bcrypt')

class EmployeeService {
    static async signup(username, email, password) {
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
            })

            return newUser
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    static async get_profile(userId) {
        try {
            const retrievedProfile = await Employee.findById (
                userId, 
            )
            const { password, ...others } = retrievedProfile._doc
            return others
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    static async update_profile(userId, profile) {
        try {
            const retrievedProfile = await Employee.findByIdAndUpdate (
                userId, 
                {
                    $set: profile,
                },
                { new: true }
            )
            return retrievedProfile
        } catch (err) {
            console.error(err)
            throw err
        }
    }
}

module.exports = EmployeeService;