const BaseController = require('../controladores/base-controller');

baseController = new BaseController();

module.exports = (app) => {

    const baseRotas = BaseController.rotas();
    
    app.get(baseRotas.home, baseController.home());
    
};
