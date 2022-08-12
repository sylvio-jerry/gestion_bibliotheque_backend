const router = require('express').Router()
const lecteur = require('../controllers/lecteurController')

router.get('/', lecteur.getAll)
router.get('/:id', lecteur.getById)
router.post('/', lecteur.create)
router.put('/:id', lecteur.update)
router.delete('/:id', lecteur.delete)   
//router.get('/:id', lecteur.getLastIdLecteur')


module.exports = router
