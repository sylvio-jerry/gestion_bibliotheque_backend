const router = require('express').Router()
const accueil = require('../controllers/accueilController')

router.get('/', accueil.getAll)
router.get('/1', accueil.getNbConsultation)
router.get('/2', accueil.getNbLivBorrowed)
router.get('/3', accueil.getNbLivReturned)
router.get('/4', accueil.getNbLivre)



module.exports = router
