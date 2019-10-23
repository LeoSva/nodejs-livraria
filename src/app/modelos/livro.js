const { check } = require('express-validator/check');

class Livro {

    static validacoes() {
        return [
            check('titulo').isLength({min: 5}).withMessage('Título inválido!'),
            check('preco').isCurrency().withMessage('Preço inválido!')
        ];
    }

}

module.exports = Livro;