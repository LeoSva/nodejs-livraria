const LivroController = require('../controladores/livro-controller');
const Livro = require('../modelos/livro');
const BaseController = require('../controladores/base-controller');

livroController = new LivroController();

module.exports = (app) => {
    const livroRotas = LivroController.rotas();

    app.use(livroRotas.autenticadas, function(req, resp, next){
        if(req.isAuthenticated()){
            next();
        }
        else {
            resp.redirect(BaseController.rotas().login);
        }
    });
    
    app.get(livroRotas.listagem, livroController.listar());

    app.route(livroRotas.cadastro)
        .get(livroController.paginaCadastro())
        .post(Livro.validacoes(), livroController.cadastrar())
        .put(livroController.alterar());

    app.get(livroRotas.alteracao, livroController.buscaPorId());

    app.delete(livroRotas.remocao, livroController.remover());
};
