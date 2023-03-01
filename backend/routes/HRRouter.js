const router = require('express').Router()
const HRController = require('../controllers/HRController')

router.post('/email', HRController.send_email);

// Adding houses
router.post('/housing', HRController.add_house);

// view all houses
router.get('/housing', HRController.view_house);

// view a house
router.get('/housing/:id', HRController.view_house_details);

// delete a house 
router.delete('/housing/:id', HRController.delete_house);

module.exports = router