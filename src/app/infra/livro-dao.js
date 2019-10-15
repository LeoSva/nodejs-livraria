class LivroDao {

    constructor(db) {
        this._db = db;
    }

    listar(){
        return new Promise( (resolve, reject) => {
            this._db.all('SELECT * FROM livros', (erro, resultados) => {
                if (erro) {
                    return reject('Não foi possível listar os livros!');
                }
                return resolve(resultados);
            });
        });
    }

    adicionar(livro){
        return new Promise((resolve, reject) => {
            this._db.run('INSERT INTO livros(titulo, preco, descricao) VALUES(?, ?, ? )', 
                [
                    livro.titulo, 
                    livro.preco, 
                    livro.descricao
                ], 
                erro => {
                    if(erro) {
                        console.log(erro);
                        return reject('Não foi possível inserir o livro');
                    }
                    return resolve();
                });
        });
    }

    buscaPorId(id) {
        return new Promise((resolve, reject) => {
            this._db.get('SELECT * FROM livros WHERE id = ?', [id], (erro, linha) => {
                if (erro) {
                    return reject('Nenhum resultado para a consulta com ID =' + id);
                }
                return resolve(linha);
            });
        });
    }

    atualizar(livro) {
        return new Promise((resolve, reject) => {
            this._db.run('UPDATE livros SET titulo=?, preco=?, descricao=? WHERE id=?', 
            [livro.titulo, livro.preco, livro.descricao, livro.id],
            (erro) => {
                if(erro) {
                    return reject('Erro ao atualizar o livro');
                }
                return resolve();
            });
        });
    }

    remover(id) {
        return new Promise((resolve, reject) => {
            this._db.run('DELETE FROM livros WHERE id=?', id, erro => {
                if(erro) {
                    return reject('Erro ao remover o livro ID='+id);
                }
                return resolve();
            });
        }); 
    }
}

module.exports = LivroDao;