const router = require('express').Router()
const ApplicationController = require('../controllers/ApplicationController')

router.post('/application', ApplicationController.createNewApplication)
router.post('/applicationID', ApplicationController.searchByID)

module.exports = router