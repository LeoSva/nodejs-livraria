const http = require('http');
const app = require('./src/config/custom-express');

app.listen(3000, function(){
    console.log('app rodando na porta 3000');
});
