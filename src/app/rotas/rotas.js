const db = require('../../config/database');
const LivroDao = require('../infra/livro-dao');
const LivroService = require('../service/livro-service');

module.exports = (app) => {
    app.get("/", function(req, resp){
        resp.end('<html><head></head><body>Casa do código</body></html>');
    });
    
    app.get("/livros", function(req, resp){
        
        livroDao = new LivroDao(db);
        
        livroDao.listar()
            .then(livros => {
                resp.marko(
                    require('../views/livros/listagem/listagem.marko'),
                    {
                        livros: livros
                    }
                )
            })
            .catch(erro => console.log(erro));

        });

        app.get('/livros/form', function(req, resp){
            resp.marko(require('../views/livros/form.marko'));
        });

        app.get('/livros/form/:id', function(req, resp){

            livroDao = new LivroDao(db);

            livroDao.buscaPorId(req.params.id)
                .then(livro => resp.marko(require('../views/livros/alterar.marko'),
                    {
                        livro: livro 
                    }))
                .catch(erro => console.log(erro));
        });

        app.post('/livros', function(req, resp){
            livroService = new LivroService(db);

            livroService.salvar(req.body)
                .then(resp.redirect('/livros'))
                .catch(erro => console.log(erro));
        });

        app.get('/livros/:id', function(req, resp){

            livroDao = new LivroDao(db);

            livroDao.buscaPorId(req.params.id)
                .then(livro => resp.marko(
                    require('../views/livros/listagem/listagem.marko'), 
                        {
                            livros: [livro]
                        }
                    )
                )
                .catch(erro => console.log(erro));
        });

        app.delete('/livros/:id', function(req, resp) {
            
            livroDao = new LivroDao(db);

            livroDao.remover(req.params.id)
                .then(() => resp.status(200).end())
                .catch(erro => console.log(erro));
        });

}; 