const router = require('express').Router()
const EmployeeController = require('../controllers/EmployeeController')

router.post('/signup', EmployeeController.signup)
router.get('/profile', EmployeeController.get_profile)
router.put('/profile', EmployeeController.update_profile)

router.get('/housing/:id', EmployeeController.getHouseInfo);

module.exports = router