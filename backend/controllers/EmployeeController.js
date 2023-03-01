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

exports.getProfile = async (req, res) => {
    try {
        const profile = await EmployeeService.getProfile(req.body.userId)
        res.status(200).json(profile)
    } catch (err) {
        console.error(err)
        res.status(500)
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const {userId, ...profile} = req.body
        const updatedProfile = await EmployeeService.updateProfile(userId, profile)
        res.status(200).json(updatedProfile)
    } catch (err) {
        console.error(err)
        res.status(500)
    }
}