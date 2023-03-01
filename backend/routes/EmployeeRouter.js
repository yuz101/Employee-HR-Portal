const router = require('express').Router()
const EmployeeController = require('../controllers/EmployeeController')

router.post('/signup', EmployeeController.signup)
router.get('/profile', EmployeeController.getProfile)
router.put('/profile', EmployeeController.updateProfile)

module.exports = router