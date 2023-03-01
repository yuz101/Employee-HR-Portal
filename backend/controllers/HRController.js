const nodemailer = require("nodemailer");
const HRService = require('../services/HRService');

exports.send_email = async (req, res) => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    try {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'teamnull2023@gmail.com',
                pass: 'walmiaczzpxlcdvn',
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Beaconfire Solution"', // sender address
            to: req.body.email, // list of receivers
            subject: "[Important] Registration Link for Beaconfire", // Subject line
            text: "Welcome to Beaconfire Solution", // plain text body
            html: "<b>Welcome to Beaconfire Solution</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        res.status(200).json(info.messageId)
    } catch (err) {
        res.status(404).json(err)
    }
}

exports.add_house = async(req, res) => {
    console.log("controller: adding a house");
    console.log("req.body: ", req.body);
    try {
        const newHouse = await HRService.add_house(req.body)
        res.status(200).json({message: 'House created successfully', newHouse});
    } catch (err) {
        res.status(404).json(err);
    }
}