const router = require('express').Router()
const consultation = require('../controllers/consultationController')

router.get('/', consultation.getAll)
router.get('/:id', consultation.getById)
router.post('/', consultation.create)
router.put('/:id', consultation.update)
router.delete('/:id', consultation.delete)

module.exports = router
