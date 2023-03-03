const EmployeeService = require('../services/EmployeeService');
const ObjectAlreadyExistsException = require('../exceptions/ObjectAlreadyExistsException');
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
    try {
        const {username, email, password} = req.body
        const newUser = await EmployeeService.signup(username, email, password)
        const accessToken = jwt.sign(
            {
                userId: newUser._id,
                username: newUser.username,
            },
                process.env.JWT_SEC,
            {
                expiresIn: '3d',
            }
        )
        res.cookie('accessToken', accessToken)
        res.status(201).json({
            userId: newUser._id
        })
    } catch (err) {
        console.error(err);
        if (err instanceof ObjectAlreadyExistsException) {
            return res.status(409).json({ message: 'Username or email already exists.' });
        }
        return res.sendStatus(500);
    } 
}

exports.get_profile = async (req, res) => {
    try {
        const profile = await EmployeeService.get_profile(req.body.userId)
        res.status(200).json(profile)
    } catch (err) {
        console.error(err)
        res.status(500)
    }
}

exports.update_profile = async (req, res) => {
    try {
        const {userId, ...profile} = req.body
        const updatedProfile = await EmployeeService.update_profile(userId, profile)
        res.status(200).json(updatedProfile)
    } catch (err) {
        console.error(err)
        res.status(500)
    }
}

exports.getHouseInfo = async(req, res) => {
    console.log("getHouseInfo");
    try {
        const employeeId = req.params.id;
        console.log("Employee Controller employeeId: ", employeeId);
        const houseData = await EmployeeService.getHouseInfo(employeeId);

        res.status(200).json(houseData);
    } catch (err) {
        console.error(err);
        res.status(500);
    }
}