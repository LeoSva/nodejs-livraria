const templates = require('../views/templates');

class BaseController {

    static rotas() {
        return {
            home: '/',
            login: '/login'
        }
    }

    home() {
        return function(req, resp) {
            resp.marko(templates.base.base);
        }
    }

    login() {
        return function(req, resp) {
            resp.marko(templates.base.login);
        }
    }

    efetuaLogin() {
        return function(req, resp) {
            // fazer a logica 
            resp.status(200).end();
        }
    }
}

module.exports = BaseController;