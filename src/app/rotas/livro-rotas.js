const LivroController = require('../controladores/livro-controller');
const Livro = require('../modelos/livro');

livroController = new LivroController();

module.exports = (app) => {
    console.log('passou no livro-rotas.js');
    const livroRotas = LivroController.rotas();
    
    app.get(livroRotas.listagem, livroController.listar());

    app.route(livroRotas.cadastro)
        .get(livroController.paginaCadastro())
        .post(Livro.validacoes(), livroController.cadastrar())
        .put(livroController.alterar());

    app.get(livroRotas.alteracao, livroController.buscaPorId());

    app.delete(livroRotas.remocao, livroController.remover());
};
