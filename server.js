const http = require('http'); // adicionado o modulo

// criando o servidor
const servidor = http.createServer(function (req, resp){
    // adicionando o conteudo da resposta
    resp.end('<html><head></head><body>Olá mundo</body></html>');
});

// config server na porta 3000
servidor.listen(3000);