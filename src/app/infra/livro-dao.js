<<<<<<< HEAD
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
                console.log(linha);
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

=======
class LivroDao {

    constructor(db) {
        this._db = db;
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO livros (
                    titulo, 
                    preco,
                    descricao
                ) values (?,?,?)
                `,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Não foi possível adicionar o livro!');
                    }

                    resolve();
                }
            )
        });
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (erro, resultados) => {
                    if (erro) return reject('Não foi possível listar os livros!');

                    return resolve(resultados);
                }
            )
        });
    }

    buscaPorId(id) {

        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    SELECT *
                    FROM livros
                    WHERE id = ?
                `,
                [id],
                (erro, livro) => {
                    if (erro) {
                        return reject('Não foi possível encontrar o livro!');
                    }
                    return resolve(livro);
                }
            );
        });
    }

    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE livros SET
                titulo = ?,
                preco = ?,
                descricao = ?
                WHERE id = ?
            `,
            [
                livro.titulo,
                livro.preco,
                livro.descricao,
                livro.id
            ],
            erro => {
                if (erro) {
                    return reject('Não foi possível atualizar o livro!');
                }

                resolve();
            });
        });
    }

    remove(id) {

        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    DELETE 
                    FROM livros
                    WHERE id = ?
                `,
                [id],
                (erro) => {
                    if (erro) {
                        return reject('Não foi possível remover o livro!');
                    }
                    return resolve();
                }
            );
        });
    }
}

>>>>>>> 19e9b9545f4aec259db4d471218ea9665d8aedbb
module.exports = LivroDao;