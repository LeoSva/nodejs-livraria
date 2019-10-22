<<<<<<< HEAD
const http = require('http');
const app = require('./src/config/custom-express');

app.listen(3000, function(){
    console.log('app rodando na porta 3000');
});
=======
const app = require('./src/config/custom-express');

app.listen(3000, function() {
    console.log(`Servidor rodando na porta 3000`);
});
>>>>>>> 19e9b9545f4aec259db4d471218ea9665d8aedbb
