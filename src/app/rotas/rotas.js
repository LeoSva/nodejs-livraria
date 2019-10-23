const LivroController = require('../controladores/livro-controller');
const BaseController = require('../controladores/base-controller');
const Livro = require('../modelos/livro');

livroController = new LivroController();
baseController = new BaseController();

module.exports = (app) => {

    const livroRotas = LivroController.rotas();
    const baseRotas = BaseController.rotas();
    
    app.get(baseRotas.home, baseController.home());
    
    app.get(livroRotas.listagem, livroController.listar());

    app.get(livroRotas.cadastro, livroController.paginaCadastro());

    app.get(livroRotas.alteracao, livroController.alterar());

    app.post(livroRotas.listagem, Livro.validacoes(), livroController.cadastrar());

    app.put(livroRotas.listagem, livroController.alterar());

    app.delete(livroRotas.remocao, livroController.remover());
};
