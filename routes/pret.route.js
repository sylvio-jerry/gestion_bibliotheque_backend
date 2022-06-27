const router = require('express').Router()
const pret = require('../controllers/pretController')

router.get('/', pret.getAll)
router.get('/:id', pret.getById)
router.post('/', pret.store)
router.put('/:id', pret.update)
router.delete('/:id', pret.delete)

module.exports = router
