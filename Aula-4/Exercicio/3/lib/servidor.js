const http = require('http');

const servidor = http.createServer((req, res) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Olá, mundo!');
});

servidor.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:${3000}/`);
});