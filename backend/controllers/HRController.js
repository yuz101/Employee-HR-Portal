const HRService = require('../services/HRService');
const crypto = require('crypto');
const ApplicationService = require('../services/ApplicationService');
const DocumentService = require('../services/DocumentService');
const Employee = require('../models/Employee');

exports.sendRegistrationEmail = async (req, res) => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    try {
        console.log(req.body)
        const token = crypto.randomUUID()
        const registration = await HRService.sendRegistrationEmail(req.body, token)
        res.status(200).json({ message: "Send registration email successfully", registration })
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.resendRegistrationEmail = async (req, res) => {
    try {
        const registrationEmail = await HRService.resendRegistrationEmail(req.body.registrationEmailId)
        console.log(registrationEmail)
        res.status(200).json({ message: "Resend registration emails successfully", registrationEmail })
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.getRegistrationEmails = async (req, res) => {
    try {
        const registrationEmails = await HRService.getRegistrationEmails()
        res.status(200).json({ message: "Retrieved registration emails successfully", registrationEmails })
    } catch (err) {
        res.status(404).json(err)
    }
}

exports.updateRegistrationEmail = async (req, res) => {
    try {
        const { registrationId, ...registration } = req.body
        const updatedRegistrationEmail = await HRService.updateRegistrationEmail(registrationId, registration)
        res.status(200).json({ message: "Updated registration email successfully", updatedRegistrationEmail })
    } catch (err) {
        res.status(404).json(err)
    }
}

exports.deleteRegistrationEmails = async (req, res) => {
    try {
        const registrationEmails = await HRService.deleteRegistrationEmails(req.body.registrationEmailIds)
        res.status(200).json({ message: "Deleted registration emails successfully", registrationEmails })
    } catch (err) {
        res.status(404).json(err)
    }
}

exports.getProfiles = async (req, res) => {
    const qSearch = req.query.search
    try {
        const employees = await HRService.getProfiles(qSearch)
        res.status(200).json({ message: "Retrieved matching profile successfully", employees })
    } catch (err) {
        res.status(404).json(err);
    }
}

exports.getApplications = async (req, res) => {
    try {
        const applications = await ApplicationService.getApplications()
        res.status(200).json({ message: "Retrieved applications successfully", applications })
    } catch (err) {
        res.status(404).json(err);
    }
}

exports.getVisas = async (req, res) => {
    try {
        const visas = await DocumentService.getAllDocumentsForEmployee(req.body.userId)
        console.log(visas)
        res.status(200).json({ message: "Retrieved visas successfully", visas })
    } catch (err) {
        res.status(404).json(err)
    }
}

exports.add_house = async (req, res) => {
    console.log("controller: adding a house");
    console.log("req.body: ", req.body);
    try {
        const newHouse = await HRService.add_house(req.body);
        res.status(200).json({ message: 'House created successfully', newHouse });
    } catch (err) {
        res.status(404).json({ err: err.message });
    }
}

exports.view_house = async (req, res) => {
    console.log("controller: view all houses");
    try {
        const houses = await HRService.view_house();
        res.status(200).json({ houses });
    } catch (err) {
        res.status(404).json({ error: error.message });
    }
}

exports.view_house_details = async (req, res) => {
    console.log("controller: view house details");
    try {
        const houseId = req.params.id;
        console.log("houseId", houseId);
        const house = await HRService.view_house_details(houseId);
        res.status(200).json({ message: 'all houses', house });
    } catch (err) {
        res.status(404).json(err);
    }
}

exports.delete_house = async (req, res) => {
    console.log("controller: delete a house");
    try {
        const houseId = req.params.id;
        const house = await HRService.delete_house(houseId);
        res.status(200).json({ message: 'House deleted successfully', house });
    } catch (err) {
        res.status(404).json({ err: err.message });
    }
}

exports.getWorkAuthorizationRecord = async (req, res) => {
    console.log("controller: workAuthorizationStatus");

    let { employeeId } = req.query;
    if (!employeeId || employeeId === '') {
        employeeId = req.token.userId;
        console.log("employeeId", employeeId);
    }
    try {
        const workAuthorizationRecord = await HRService.getWorkAuthorizationRecord(employeeId);
        res.status(200).json({ workAuthorizationRecord });
    } catch (err) {
        res.status(404).json({ err: err.message });
    }
}

exports.getAllCurrentWorkAuthorizationStatusRecords = async (req, res) => {
    console.log("controller: workAuthorizationStep");
    try {
        const currentRecords = await HRService.getAllCurrentWorkAuthorizationStatusRecords();
        res.status(200).json({ currentRecords });
    } catch (err) {
        res.status(404).json({ err: err.message });
    }
}

exports.updateDocumentStatus = async (req, res) => {
    const { employeeId, action, feedback } = req.body;
    try {
        const newStatusRecord = await HRService.updateDocumentStatus(employeeId, action, feedback);
        res.status(200).json({ newStatusRecord });
    } catch (err) {
        res.status(404).json({ err: err.message });
    }
};


