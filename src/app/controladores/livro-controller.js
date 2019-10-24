const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');
const {validationResult}  = require('express-validator/check');
const template = require('../views/templates');

class LivroController {

    static rotas() {
        return {
            base: '/',
            listagem: '/livros',
            cadastro: '/livros/form',
            alteracao: '/livros/form/:id',
            remocao: '/livros/:id'
        }
    }

    listar() {
        return function(req, resp) {
            const livroDao = new LivroDao(db);
            livroDao.lista()
                    .then(livros => resp.marko(
                        template.livro.lista,
                        {
                            livros: livros
                        }
                    ))
                    .catch(erro => console.log(erro));
        }
    }

    paginaCadastro() {
        return function(req, resp) {
            resp.marko(template.livro.cadastro, { livro: {} });
        }
    }

    buscaPorId() {
        return function(req, resp) {
            const id = req.params.id;
            const livroDao = new LivroDao(db);
            livroDao.buscaPorId(id)
                    .then(livro => 
                        resp.marko(
                            template.livro.cadastro, 
                            { livro: livro }
                        )
                    )
                    .catch(erro => console.log(erro));
        }
    }

    cadastrar() {
        return function(req, resp) {
        
            let erros = validationResult(req);
            
            if(!erros.isEmpty()) {
                return resp.marko(
                    template.livro.cadastro,
                    {
                        livro: req.body,
                        errosValidacao: erros.array()
                    }
                );
            }
            
            const livroDao = new LivroDao(db);
            livroDao.adiciona(req.body)
                    .then(resp.redirect('/livros'))
                    .catch(erro => console.log(erro));
            
        }
    }

    alterar() {
        return function(req, resp) {

            const livroDao = new LivroDao(db);
            livroDao.altera(req.body)
                    .then(resp.redirect('/livros'))
                    .catch(erro => console.log(erro));
        }
    }

    remover() {
        return function(req, resp) {
            const id = req.params.id;
    
            const livroDao = new LivroDao(db);
            livroDao.remove(id)
                    .then(() => resp.status(200).end())
                    .catch(erro => console.log(erro));
        }
    }
}

module.exports = LivroController;