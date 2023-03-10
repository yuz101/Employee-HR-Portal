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
router.get('/work-authorization-record', verifyToken, HRController.getWorkAuthorizationRecord);

// view all employees work authorization step
router.get('/current-work-authorization-status-records', verifyToken, verifyHR, HRController.getAllCurrentWorkAuthorizationStatusRecords);

// view all approved employees 
router.patch('/document-status', verifyToken, verifyHR, HRController.updateDocumentStatus);

router.post('/work-authorization-reminder', verifyToken, verifyHR, HRController.sendWorkAuthorizationStatusEmail);

module.exports = router