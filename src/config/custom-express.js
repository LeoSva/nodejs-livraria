const express = require('express');
const app = express();
const rotas = require('../app/rotas/rotas');
const bodyParser = require('body-parser');

require('marko/node-require').install();
require('marko/express');

app.use('/estatico', express.static('src/app/public'));

app.use(bodyParser.urlencoded({
    extended: true
}));

rotas(app);

module.exports = app;