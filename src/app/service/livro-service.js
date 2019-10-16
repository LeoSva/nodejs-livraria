const LivroDao = require('../infra/livro-dao');

class LivroService {

    constructor(db) {
        this._db = db;
    }

    salvar(livro) {
        return new Promise( (resolve, reject) => {
           let livroDao = new LivroDao(this._db);
            if(livro.id) {
                return livroDao.atualizar(livro)
                    .then(resolve())
                    .catch(erro => console.log(erro));
            }
            return livroDao.adicionar(livro)
                .then(resolve())
                .catch(erro => console.log(erro));
        });
    }
}

module.exports = LivroService;
