const router = require('express').Router()
const HRController = require('../controllers/HRController');
const { verifyToken, verifyHR } = require('../middleware/verifyToken');

// send registration email
router.post('/registration-email', HRController.sendRegistrationEmail);

router.post('/resend-registration-email', HRController.resendRegistrationEmail);

router.get('/registration-emails', HRController.getRegistrationEmails);

router.put('/registration-email', HRController.updateRegistrationEmail);

// view all profiles
router.get("/profiles", verifyToken, verifyHR, HRController.getProfiles)

// view all applications
router.get("/applications", HRController.getApplications)

// view all visas
router.get("/visas", HRController.getVisas)

// add a house
router.post('/housing', HRController.add_house);

// view all houses
router.get('/housing', HRController.view_house);

// view a house
router.get('/housing/:id', HRController.view_house_details);

// delete a house 
router.delete('/housing/:id', HRController.delete_house);

module.exports = router