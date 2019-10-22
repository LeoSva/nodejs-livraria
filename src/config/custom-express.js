<<<<<<< HEAD
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

=======
require('marko/node-require').install();
require('marko/express');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use('/estatico', express.static('src/app/public'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
}));

const rotas = require('../app/rotas/rotas');
rotas(app);

app.use(function(req, resp, next){
  return resp.status(404).marko( require('../app/views/base/erros/404.marko'));
});

app.use(function(erro, req, resp, next){
  return resp.status(500).marko(require('../app/views/base/erros/500.marko'));
});

>>>>>>> 19e9b9545f4aec259db4d471218ea9665d8aedbb
module.exports = app;