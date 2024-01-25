import * as express from 'express'
const AuthController = require('../controllers/authController')
const router = express.Router()

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)
router.post('/reset-otp', AuthController.resetOtp)
router.post('/verify-otp', AuthController.verifyOtp)

module.exports = router
