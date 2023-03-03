const HRService = require('../services/HRService');
const jwt = require('jsonwebtoken')

exports.send_email = async (req, res) => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    try {
        const emailToken = jwt.sign(
            {
                name: req.body.name,
                email: req.body.email,
            },
                process.env.JWT_SEC,
            {
                expiresIn: '3h',
            }
        )
        const registration = await HRService.send_email(req.body.name, req.body.email, emailToken)
        res.status(200).json({ message: "Send registration email successfully", registration})
    } catch (err) {
        res.status(404).json(err)
    }
}

exports.get_profiles = async(req, res) => {
    const qSearch = req.query.search
    try {
        const employees = await HRService.get_profiles(qSearch)
        res.status(200).json({message: "Retrieved matching profile successfully", employees})
    } catch (err) {
        res.status(404).json(err);
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