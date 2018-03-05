const express = require('express');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan =  require('morgan');
const cors = require('cors')
const app = express();

mongoose.Promise = global.Promise;

var uristring = process.env.MONGODB_URI || 'mongodb://localhost/chat';

mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
app.use(express.static('public'));
routes(app);

app.use( (err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
