var Usuario = require('./lib/usuario');

let fs = require('fs');

fs.readFile('data/nomes.txt', 'utf-8', function(err, data) {
    if(err) throw err;
    Usuario(data);
})