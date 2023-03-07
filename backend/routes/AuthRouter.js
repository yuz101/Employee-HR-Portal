const router = require('express').Router()
const AuthController = require('../controllers/AuthController')

// sign up
router.post('/signup', AuthController.signup)

module.exports = router