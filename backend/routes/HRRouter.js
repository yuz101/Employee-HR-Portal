const router = require('express').Router()
const HRController = require('../controllers/HRController')

// send registration email
router.post('/email', HRController.sendEmail);

// view all profiles
router.get("/profiles", HRController.getProfiles)

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