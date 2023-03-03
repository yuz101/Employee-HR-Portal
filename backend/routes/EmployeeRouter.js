const router = require('express').Router()
const EmployeeController = require('../controllers/EmployeeController')

router.post('/signup', EmployeeController.signup)
router.get('/profile', EmployeeController.getProfile)
router.put('/profile', EmployeeController.updateProfile)

router.get('/housing/:id', EmployeeController.getHouseInfo);

module.exports = router