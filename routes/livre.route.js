const router = require('express').Router()
const livre = require('../controllers/livreController')

router.get('/', livre.getAll)
router.get('/:id', livre.getById)
router.post('/', livre.store)
router.put('/:id', livre.update)
router.delete('/:id', livre.delete)
router.delete('/',livre.deleteChecked)

module.exports = router