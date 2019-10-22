<<<<<<< HEAD
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
                .then(livro => resp.marko(require('../views/livros/form.marko'),
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
=======
const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');
const { check, validationResult } = require('express-validator/check');

module.exports = (app) => {
    app.get('/', function(req, resp) {
        resp.marko(
            require('../views/base/home/home.marko')
        );
    });
    
    app.get('/livros', function(req, resp) {

        const livroDao = new LivroDao(db);
        livroDao.lista()
                .then(livros => resp.marko(
                    require('../views/livros/lista/lista.marko'),
                    {
                        livros: livros
                    }
                ))
                .catch(erro => console.log(erro));
    });

    app.get('/livros/form', function(req, resp) {
        resp.marko(require('../views/livros/form/form.marko'), { livro: {} });
    });

    app.get('/livros/form/:id', function(req, resp) {
        const id = req.params.id;
        const livroDao = new LivroDao(db);

        livroDao.buscaPorId(id)
                .then(livro => 
                    resp.marko(
                        require('../views/livros/form/form.marko'), 
                        { livro: livro }
                    )
                )
                .catch(erro => console.log(erro));
    });

    app.post('/livros', 
        [
            check('titulo').isLength({min: 5}).withMessage('Título inválido!'),
            check('preco').isCurrency().withMessage('Preço inválido!')
        ], 
        function(req, resp) {
        
        let erros = validationResult(req);
        
        if(!erros.isEmpty()) {
            return resp.marko(
                require('../views/livros/form/form.marko'),
                {
                    livro: {},
                    errosValidacao: erros.array()
                }
            );
        }
        
        const livroDao = new LivroDao(db);
        livroDao.adiciona(req.body)
                .then(resp.redirect('/livros'))
                .catch(erro => console.log(erro));
        
    });

    app.put('/livros', function(req, resp) {
        console.log(req.body);
        const livroDao = new LivroDao(db);
        
        livroDao.atualiza(req.body)
                .then(resp.redirect('/livros'))
                .catch(erro => console.log(erro));
    });

    app.delete('/livros/:id', function(req, resp) {
        const id = req.params.id;

        const livroDao = new LivroDao(db);
        livroDao.remove(id)
                .then(() => resp.status(200).end())
                .catch(erro => console.log(erro));
    });
};
>>>>>>> 19e9b9545f4aec259db4d471218ea9665d8aedbb
