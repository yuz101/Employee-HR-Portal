const router = require('express').Router()
const EmployeeController = require('../controllers/EmployeeController')
const { verifyToken } = require('../middleware/verifyToken')

// retrieve user profile
router.get('/profile', verifyToken, EmployeeController.getPofile)

// update user profile
router.put('/profile', verifyToken, EmployeeController.updateProfile)

// users should be able to view their assigned housing details
router.get('/housing/:id', verifyToken, EmployeeController.getHouseInfo);

// users should be able to report facility issuses
router.post('/housing/:id/report',verifyToken, EmployeeController.createReport);

// view existing reports 
router.get('/housing/:id/report', verifyToken, EmployeeController.viewReport);

// ddding comments
router.post('/housing/:id/report/:reportId', verifyToken, EmployeeController.createComment);

// viewing a report's list of comments
router.get('/housing/:id/report/:reportId', verifyToken, EmployeeController.getComment);

router.get('/work-authorization-status', verifyToken, EmployeeController.getWorkAuthorizationStatus);

module.exports = router