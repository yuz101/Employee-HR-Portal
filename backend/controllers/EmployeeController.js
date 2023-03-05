const EmployeeService = require('../services/EmployeeService');
const ObjectAlreadyExistsException = require('../exceptions/ObjectAlreadyExistsException');
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
    try {
        console.log("hello")
        const {username, email, password} = req.body
        const newUser = await EmployeeService.signup(username, email, password)
        const token = jwt.sign(
            {
                userId: newUser._id,
                username: newUser.username,
            },
                process.env.JWT_SEC,
            {
                expiresIn: '3d',
            }
        )
        res.status(201).json({ jwt: token })
    } catch (err) {
        console.error(err);
        if (err instanceof ObjectAlreadyExistsException) {
            return res.status(409).json({ message: 'Username or email already exists.' });
        }
        return res.sendStatus(500);
    } 
}

exports.getPofile = async (req, res) => {
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

exports.createReport = async(req, res) => {
    console.log("creating a facility report");
    console.log("req.body: ", req.body);
    try {
        const reportData = await EmployeeService.createReport(req);
        res.status(200).json({ message: 'Report created successfully', reportData });
    } catch (err) {
        res.status(404).json(err);
    }
    
}

exports.viewReport = async(req, res) => {
    console.log("view facility reports");
    try {
        const employeeId = req.params.id;
        const reports = await EmployeeService.viewReport(employeeId);
        res.status(200).json({ message: 'view all submitted reports', reports });
    } catch (err) {
        res.status(404).json(err);
    }
}

exports.createComment = async(req, res) => {
    console.log("adding comments");
    console.log("req.body: ", req.body);
    try {
        const comment = await EmployeeService.createComment(req);
        res.status(200).json({ message: 'adding comments', comment});
    } catch (err) {
        res.status(404).json(err);
    }
}

exports.getComment = async(req, res) => {
    console.log("a report's list of comments");
    console.log("req.body:", req.body);
    try {
        const comments = await EmployeeService.getComment(req);
        res.status(200).json({ message: 'view a report\'s list of comments', comments });
    } catch (err) {
        res.status(404).json(err);
    }
}