const router = require('express').Router()
const HRController = require('../controllers/HRController')

router.post('/email', HRController.send_email)

module.exports = router