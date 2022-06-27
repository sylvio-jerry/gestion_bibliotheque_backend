const router = require('express').Router()
const user = require('../controllers/auth/authController')

router.post('/register', user.register)

module.exports = router