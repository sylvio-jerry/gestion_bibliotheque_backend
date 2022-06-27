const router = require('express').Router()
const user = require('../controllers/auth/authController')

router.post('/register', user.register)
router.post('/login', user.login)
router.post('/logout', user.logout)
router.put('/update', user.update)

module.exports = router