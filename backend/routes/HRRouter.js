const router = require('express').Router()
const HRController = require('../controllers/HRController');
const { verifyToken, verifyHR } = require('../middleware/verifyToken');

// send registration email
router.post('/registration-email', verifyToken, verifyHR, HRController.sendRegistrationEmail);

router.put('/resend-registration-email', verifyToken, verifyHR, HRController.resendRegistrationEmail);

router.get('/registration-emails', verifyToken, verifyHR, HRController.getRegistrationEmails);

router.put('/registration-email', verifyToken, verifyHR, HRController.updateRegistrationEmail);

// view all profiles
router.get("/profiles", verifyToken, verifyHR, HRController.getProfiles)

// view all applications
router.get("/applications", verifyToken, verifyHR, HRController.getApplications)

// view all visas
router.get("/visas", verifyToken, verifyHR, HRController.getVisas)

// add a house
router.post('/housing', verifyToken, verifyHR, HRController.add_house);

// view all houses
router.get('/housing', verifyToken, verifyHR, HRController.view_house);

// view a house
router.get('/housing/:id', verifyToken, verifyHR, HRController.view_house_details);

// delete a house 
router.delete('/housing/:id', verifyToken, verifyHR, HRController.delete_house);

// view all employees work authorization status
router.get('/workAuthorizationStatus', verifyToken, verifyHR, HRController.workAuthorizationStatus);

// view all employees work authorization step
router.get('/workAuthorizationStep', verifyToken, verifyHR, HRController.workAuthorizationStep);

// view all approved employees 
router.patch('/updateDocumentStatus', HRController.updateDocumentStatus);

module.exports = router