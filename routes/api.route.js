const router = require('express').Router();
const testController = require('../controllers/lecteurController')

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.get('/cons', testController.getAll)

module.exports = router;
