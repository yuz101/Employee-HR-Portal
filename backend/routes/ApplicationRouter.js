const router = require('express').Router()
const ApplicationController = require('../controllers/ApplicationController')
const { check, validationResult } = require('express-validator');
const { verifyToken, verifyHR } = require('../middleware/verifyToken');


//以下是error check部分，强烈建议不要使用，mongoose可能是一个更好的选择。
const validateApplication = [
    // check('userID').exists().withMessage('userID is required.').
    //     isMongoId().withMessage('userID must be a valid MongoDB ObjectId.'),
    check('status').exists().withMessage('Status is required.').
        isIn(['Pending', 'Approved', 'Rejected']).
        withMessage('Status must be either Pending, Approved, or Rejected.'),
    check('email')
        .exists().withMessage('Email is required.')
        .isEmail().withMessage('Email is invalid.'),
    check('firstName')
        .exists().withMessage('First name is required.')
        .not().isEmpty().withMessage('First name cannot be empty or only contain whitespaces.'),
    check('lastName')
        .exists().withMessage('Last name is required.')
        .not().isEmpty().withMessage('Last name cannot be empty or only contain whitespaces.'),
    check('middleName')
        .optional().isString().withMessage('middle must be String.'),
    check('preferredName')
        .optional().isString().withMessage('middle must be String.'),
    check('phoneNumber')
        .exists().withMessage('Phone number is required.')
        .isMobilePhone().withMessage('Phone number is invalid.'),
    check('workPhoneNumber')
        .optional(),
    check('address.streetName')
        .exists().withMessage('Street name is required.')
        .withMessage('Address name cannot be empty or only contain whitespaces.'),
    check('address.buildingNumber')
        .exists().withMessage('Building number is required.')
        .not().isEmpty().withMessage('Building number cannot be empty or only contain whitespaces.'),
    check('address.city')
        .exists().withMessage('City is required.'),
    check('address.state')
        .exists().withMessage('State is required.')
        .not().isEmpty().withMessage('Address state cannot be empty or only contain whitespaces.'),
    check('address.zip')
        .exists().withMessage('Zip code is required.')
        .isPostalCode('US').withMessage('Zip code is invalid.'),
    check('carInformation.make')
        .exists().withMessage('Car make is required.'),
    check('carInformation.model')
        .exists().withMessage('Car model is required.'),
    check('carInformation.color')
        .exists().withMessage('Car color is required.'),
    check('SSN')
        .exists().withMessage('SSN is required.')
        .isNumeric().withMessage('SSN must be a numeric value.'),
    check('birthday')
        .exists().withMessage('Birthday is required.')
        .isISO8601().withMessage('Birthday must be in ISO8601 format (YYYY-MM-DD).'),
    check('gender')
        .exists().withMessage('Gender is required.')
        .isIn(['Male', 'Female']).withMessage('Gender must be either Male or Female.'),
    check('identifyType.visaTitle')
        .exists().withMessage('Visa title is required.'),
    check('identifyType.startDate')
        .exists().withMessage('Start date is required.')
        .isISO8601().withMessage('Start date must be in ISO8601 format (YYYY-MM-DD).'),
    check('identifyType.endDate')
        .exists().withMessage('End date is required.')
        .isISO8601().withMessage('End date must be in ISO8601 format (YYYY-MM-DD).'),
    check('driversLicense.licenseNumber')
        .optional({checkFalsy: true}).isNumeric().withMessage("Driver's license number must be a numeric value."),
    check('driversLicense.expirationDate')
        .optional({checkFalsy: true}).isISO8601().withMessage("Driver's license expiration date must be in ISO8601 format (YYYY-MM-DD)."),
    check('reference.firstName')
        .exists().withMessage('Reference first name is required.'),
    check('reference.lastName')
        .exists().withMessage('Reference last name is required.'),
    check('reference.phoneNumber')
        .exists().withMessage('Reference phone number is required.')
        .isMobilePhone().withMessage('Reference phone number is invalid.'),
    check('reference.email')
        .exists().withMessage('Reference email is required.')
        .isEmail().withMessage('Reference email is invalid.'),
    check('reference.relationship')
        .exists().withMessage('Reference relationship is required.'),
    check('emergencyContacts.firstName')
        .exists().withMessage('Emergency contact first name is required.'),
    check('emergencyContacts.lastName')
        .exists().withMessage('Emergency contact last name is required.'),
    check('emergencyContacts.phoneNumber')
        .exists().withMessage('Emergency contact phone number is required.')
        .isMobilePhone().withMessage('Emergency contact phone number is invalid.'),
    check('emergencyContacts.email')
        .exists().withMessage('Emergency contact email is required.')
        .isEmail().withMessage('Emergency contact email is invalid.'),
    check('emergencyContacts.relationship')
        .exists().withMessage('Emergency contact relationship is required.')
];

router.post('/application', validateApplication, verifyToken, ApplicationController.createNewApplication)
router.get('/applicationID/:id', verifyToken, verifyHR, ApplicationController.searchByID)
router.get('/applicationPID/', verifyToken, verifyHR, ApplicationController.searchByPID)
router.get('/allapplication', verifyToken, verifyHR, ApplicationController.getAllInfo)
router.post('/approve/:id', verifyToken, verifyHR, ApplicationController.updateStatusApprove)
router.post('/reject/:id', verifyToken, verifyHR, ApplicationController.updateStatusReject)



module.exports = router