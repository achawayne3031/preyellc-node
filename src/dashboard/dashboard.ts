import * as express from 'express'
const DashboardController = require('../controllers/dashboardController')
const UserAuth = require('../middlewares/auth')

const router = express.Router()

router.get('/all-users', UserAuth, DashboardController.allUsers)

module.exports = router
