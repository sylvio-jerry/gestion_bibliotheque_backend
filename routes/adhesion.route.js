const router = require('express').Router()
const adhesion = require('../controllers/adhesionController')

router.get('/', adhesion.getAll)
router.get('/:id', adhesion.getById)
router.post('/', adhesion.create)
router.put('/:id', adhesion.update)
router.delete('/:id', adhesion.delete)   

module.exports = router
