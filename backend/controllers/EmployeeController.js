const EmployeeService = require('../services/EmployeeService');
const ObjectAlreadyExistsException = require('../exceptions/ObjectAlreadyExistsException');
const jwt = require('jsonwebtoken');
const { DocumentStatusEnum } = require('../enums/DocumentStatusEnum');

exports.getPofile = async (req, res) => {
    try {
        const profile = await EmployeeService.getProfile(req.token.userId)
        res.status(200).json(profile)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const updatedProfile = await EmployeeService.updateProfile(req.token.userId, req.body)
        res.status(200).json(updatedProfile)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
}

exports.getHouseInfo = async (req, res) => {
    console.log("getHouseInfo");
    try {
        const employeeId = req.params.id;
        console.log("Employee Controller employeeId: ", employeeId);
        const houseData = await EmployeeService.getHouseInfo(employeeId);

        res.status(200).json(houseData);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

exports.createReport = async (req, res) => {
    console.log("creating a facility report");
    console.log("req.body: ", req.body);
    try {
        const reportData = await EmployeeService.createReport(req);
        res.status(200).json({ message: 'Report created successfully', reportData });
    } catch (err) {
        res.status(404).json(err);
    }

}

exports.viewReport = async (req, res) => {
    console.log("view facility reports");
    try {
        const employeeId = req.params.id;
        const reports = await EmployeeService.viewReport(employeeId);
        res.status(200).json({ message: 'view all submitted reports', reports });
    } catch (err) {
        res.status(404).json(err);
    }
}

exports.createComment = async (req, res) => {
    console.log("adding comments");
    console.log("req.body: ", req.body);
    try {
        const comment = await EmployeeService.createComment(req);
        res.status(200).json({ message: 'adding comments', comment });
    } catch (err) {
        res.status(404).json(err);
    }
}

exports.getComment = async (req, res) => {
    console.log("a report's list of comments");
    console.log("req.body:", req.body);
    try {
        const comments = await EmployeeService.getComment(req);
        res.status(200).json({ message: 'view a report\'s list of comments', comments });
    } catch (err) {
        res.status(404).json(err);
    }
}

exports.getWorkAuthorizationStatus = async (req, res) => {
    const apiResponse = {
        started: true,
        completed: false,
        documentType: null,
        documentStatus: null,
        feedback: null,
        action: {
            name: null,
        },
    }
    const { employeeId } = req.body;
    try {
        const workAuthStatus = await EmployeeService.getWorkAuthorizationStatus(employeeId);
        if (!workAuthStatus.started) {
            apiResponse.started = false;
            return res.json(apiResponse);
        }
        if (workAuthStatus.completed) {
            apiResponse.completed = true;
            return res.json(apiResponse);
        }
        const uploadFlow = workAuthStatus.uploadFlow;
        for (const state of uploadFlow) {
            if (state.status !== DocumentStatusEnum.APPROVED) {
                apiResponse.documentType = state.documentType;
                apiResponse.documentStatus = state.status;
                if (state.status === 'Not Uploaded') {
                    const action = {
                        name: 'Send Notification',
                    }
                    apiResponse.action = action;
                }
                else if (state.status === DocumentStatusEnum.PENDING_FOR_REVIEW) {
                    const action = {
                        name: 'Review',
                    }
                    apiResponse.action = action;
                }
                break;
            }
        }

        res.json(apiResponse);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}