const router = require('express').Router()
const EmployeeController = require('../controllers/EmployeeController')

// retrieve user profile
router.get('/profile', EmployeeController.getPofile)

// update user profile
router.put('/profile', EmployeeController.updateProfile)

// users should be able to view their assigned housing details
router.get('/housing/:id', EmployeeController.getHouseInfo);

// users should be able to report facility issuses
router.post('/housing/:id/report', EmployeeController.createReport);

// view existing reports 
router.get('/housing/:id/report', EmployeeController.viewReport);

// ddding comments
router.post('/housing/:id/report/:reportId', EmployeeController.createComment);

// viewing a report's list of comments
router.get('/housing/:id/report/:reportId', EmployeeController.getComment);

router.get('/work-authorization-status', EmployeeController.getWorkAuthorizationStatus);

module.exports = router