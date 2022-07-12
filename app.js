const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/api/users', require('./routes/auth.route'));

app.use('/api', require('./routes/api.route'));
app.use('/api/accueils', require('./routes/accueil.route'));
app.use('/api/prets', require('./routes/pret.route'));
app.use('/api/lecteurs', require('./routes/lecteur.route'));
app.use('/api/adhesions', require('./routes/adhesion.route'));
app.use('/api/consultations', require('./routes/consultation.route'));


app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
