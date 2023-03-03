const router = require('express').Router()
const EmployeeController = require('../controllers/EmployeeController')

router.post('/signup', EmployeeController.signup)
router.get('/profile', EmployeeController.get_profile)
router.put('/profile', EmployeeController.update_profile)

// Users should be able to view their assigned housing details
router.get('/housing/:id', EmployeeController.getHouseInfo);

// Users should be able to report facility issuses
router.post('/housing/:id/report', EmployeeController.createReport);

// view existing reports 
router.get('/housing/:id/report', EmployeeController.viewReport);

// Adding comments
router.post('/housing/:id/report/:reportId', EmployeeController.createComment);

// viewing a report's list of comments
router.get('/housing/:id/report/:reportId', EmployeeController.getComment);

module.exports = router