const BaseController = require('../controladores/base-controller');

baseController = new BaseController();

module.exports = (app) => {

    const baseRotas = BaseController.rotas();
    
    app.get(baseRotas.home, baseController.home());

    app.route(baseRotas.login)
        .get(baseController.login())
        .post(baseController.efetuaLogin());
    
};
