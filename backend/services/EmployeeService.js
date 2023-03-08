const Employee = require('../models/Employee');
const ObjectAlreadyExistsException = require('../exceptions/ObjectAlreadyExistsException');
const bcrypt = require('bcrypt')

const House = require('../models/House');
const { report } = require('../routes/HRRouter');
const Report = require('../models/FacilityReport');
const Comment = require('../models/Comment');
const FacilityReport = require('../models/FacilityReport');

const EmployeeWorkAuthorizationStatus = require('../models/EmployeeWorkAuthorizationStatus');

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
            const retrievedProfile = await Employee.findById(
                userId,
            )
            console.log(retrievedProfile)
            const { password, ...others } = retrievedProfile._doc
            return others
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    static async updateProfile(userId, profile) {
        try {
            const retrievedProfile = await Employee.findByIdAndUpdate(
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

            console.log("houses:", houses);
            await Promise.all(
                houses.map(async (house) => {
                    await house.populate({
                        path: "roommates",
                        select: "firstName lastName phoneNumber"
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

    static async createReport(req) {
        console.log("service: creating a report");

        try {
            const employeeId = req.params.id;
            const employee = await Employee.findById(employeeId);
            if (!employee) {
                return res.status(400).json({ msg: 'Invalid employee ID' });
            }
            const { title, description, createdBy, status } = req.body;
            if (!title || !description) {
                return res.status(400).json({ msg: 'Please fill in all required fields' });
            }
            const newReport = new Report({
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                createdBy: req.params.id
            });
            await newReport.save();

            return newReport;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static async viewReport(employeeId) {
        console.log("service: view reports");
        try {
            const employee = await Employee.findById(employeeId);
            if (!employee) {
                return res.status(404).json({ message: 'invalid employee id' });
            }
            const reports = await Report.find({ createdBy: employeeId });

            return reports;
        } catch (err) {
            res.error(err);
            throw err;
        }
    }

    static async createComment(req, res) {
        console.log("service: adding comments");
        try {
            const employeeId = req.params.id;
            const employee = await Employee.findById(employeeId);
            if (!employee) {
                return res.status(404).json({ message: 'Invalid employee ID' });
            }
            const reportId = req.params.reportId;
            const report = await FacilityReport.findById(reportId);
            if (!report) {
                return res.status(404).json({ message: 'Invalid report ID' });
            }

            if (report.createdBy.toString() !== employeeId) {
                return res.status(403).json({ message: "You are not authorized to add comments to this report" });
            }
            const comment = new Comment({
                description: req.body.description,
                createdBy: employeeId
            });

            report.comments.push(comment);
            await report.save();
            const savedComment = await comment.save();

            return savedComment;
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getComment(req, res) {
        console.log("service: viewing comments");
        try {
            const employeeId = req.params.id;
            const employee = await Employee.findById(employeeId);
            if (!employee) {
                return res.status(404).json({ message: 'invalid employee ID' });
            }
            const reportId = req.params.reportId;
            const report = await FacilityReport.findById(reportId).populate('comments');
            if (!report) {
                return res.status(404).json({ message: 'invalid report ID' });
            }

            if (report.createdBy.toString() !== employeeId) {
                return res.status(403).json({ message: "You are not authorized to view comments for this report" });
            }

            return report;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static async getWorkAuthorizationStatus(employeeId) {
        try {
            const workAuthorizationStatus = await EmployeeWorkAuthorizationStatus
                .findOne({ employeeId: employeeId }).exec();
            return workAuthorizationStatus;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = EmployeeService;