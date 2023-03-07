const HRService = require('../services/HRService');
const crypto = require('crypto');
const ApplicationService = require('../services/ApplicationService');
const DocumentService = require('../services/DocumentService');

exports.sendEmail = async (req, res) => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    try {
        const token = crypto.randomUUID()
        const registration = await HRService.send_email(req.body.name, req.body.email, token)
        res.status(200).json({ message: "Send registration email successfully", registration})
    } catch (err) {
        res.status(404).json(err)
    }
}

exports.getProfiles = async(req, res) => {
    const qSearch = req.query.search
    try {
        const employees = await HRService.getProfiles(qSearch)
        res.status(200).json({message: "Retrieved matching profile successfully", employees})
    } catch (err) {
        res.status(404).json(err);
    }
}

exports.getApplications = async(req, res) => {
    try {
        const applications = await ApplicationService.getApplications()
        res.status(200).json({message: "Retrieved applications successfully", applications})
    } catch (err) {
        res.status(404).json(err);
    }
}

exports.getVisas = async (req, res) => {
    try {
        const visas = await DocumentService.getAllDocumentsForEmployee(req.body.userId)
        console.log(visas)
        res.status(200).json({message: "Retrieved visas successfully", visas})
    } catch (err) {
        res.status(404).json(err)
    }
}

exports.add_house = async(req, res) => {
    console.log("controller: adding a house");
    console.log("req.body: ", req.body);
    try {
        const newHouse = await HRService.add_house(req.body);
        res.status(200).json({message: 'House created successfully', newHouse});
    } catch (err) {
        res.status(404).json({ err: err.message });
    }
}

exports.view_house = async(req, res) => {
    console.log("controller: view all houses");
    try {
        const houses = await HRService.view_house();
        res.status(200).json({ houses });
    } catch (err) {
        res.status(404).json({ error: error.message });
    }
}

exports.view_house_details = async(req, res) => {
    console.log("controller: view house details");
    try {
        const houseId = req.params.id;
        console.log("houseId", houseId);
        const house = await HRService.view_house_details(houseId);
        res.status(200).json({ message: 'all houses',  house});
    } catch (err) {
        res.status(404).json(err);
    }
}

exports.delete_house = async(req, res) => {
    console.log("controller: delete a house");
    try {
        const houseId = req.params.id;
        const house = await HRService.delete_house(houseId);
        res.status(200).json({ message: 'House deleted successfully', house });
    } catch(err) {
        res.status(404).json({ err: err.message });
    }
}