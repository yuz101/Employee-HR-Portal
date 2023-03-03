const Employee = require('../models/Employee');
const ObjectAlreadyExistsException = require('../exceptions/ObjectAlreadyExistsException');
const bcrypt = require('bcrypt')

const House = require('../models/House');

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

    static async getProfile(userId) {
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

    static async updateProfile(userId, profile) {
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

    static async getHouseInfo(employeeId) {
        try {
            const employee = await Employee.findById(employeeId);
            const houses = await House.find({ roommates: employeeId });

            console.log("houses:" , houses);
            await Promise.all(
                houses.map(async (house) => {
                    await house.populate({
                        path: "roommates",
                        select:"firstName lastName phoneNumber"
                    });
                })
            );

            const houseData = houses.map((house) => ({
                address: house.address,
                roommates: house.roommates.map((roommate) => ({
                  firstName: roommate.firstName,
                  lastName: roommate.lastName,
                  phoneNumber: roommate.phoneNumber,
                })),
            }));

            return houseData;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

module.exports = EmployeeService;