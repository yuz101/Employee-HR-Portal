const router = require('express').Router()
const HRController = require('../controllers/HRController')

router.post('/email', HRController.send_email);

// Adding houses
router.post('/housing', HRController.add_house);

module.exports = router