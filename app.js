const express = require('express');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan =  require('morgan');
const cors = require('cors')
const app = express();

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/chat');
}

app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
routes(app);

app.use( (err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
