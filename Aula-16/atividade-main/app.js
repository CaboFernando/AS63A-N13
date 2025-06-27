const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
    session(
        {
            secret: 'segredo_super_secreto',
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 60000 } // 1 minuto de sessão
        })
);

function checkLogin(req, res, next) {
    if (req.session.logado) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { usuario, senha } = req.body;
    // Exemplo fixo, você pode trocar por uma verificação
    //com BD
    if (usuario === 'admin' && senha === '123') {
        req.session.logado = true;
        res.redirect('/');
    } else {
        res.send('Usuário ou senha inválidos. <a href = "/login" > Tentar de novo</a > ');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.get('/', checkLogin, (req, res) => {
    res.render('index');
});

app.post('/mensagem_post', checkLogin, (req, res) => {
    const msg = req.body.mensagem;
    console.log('Mensagem recebida:', msg);
    res.send(`Mensagem recebida: ${msg} <br><a
    href="/">Voltar</a>`);
});

http.createServer(app).listen(3000);