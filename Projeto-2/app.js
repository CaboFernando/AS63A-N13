const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const User = require('./models/user');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'seu_segredo_super_secreto',
    resave: false, 
    saveUninitialized: false, 
    cookie: { maxAge: 60000 } 
}));

app.use(express.static(path.join(__dirname, 'public')));

function checkLogin(req, res, next) {
    if (req.session.logado) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.get('/login', (req, res) => {
    res.render('login', { error: req.query.error });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findByUsername(username);

        if (user && await User.verifyPassword(password, user.password)) {
            req.session.logado = true;
            req.session.username = user.username; 
            res.redirect('/'); 
        } else {
            res.redirect('/login?error=true');
        }
    } catch (error) {
        console.error("Erro durante o login:", error);
        res.redirect('/login?error=true');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Erro ao destruir sessão:", err);
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});

app.get('/', checkLogin, (req, res) => {
    res.render('index', { username: req.session.username });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/`);
});


async function registerInitialUser() {
    const testUser = new User('admin', 'admin123');
    try {
        await testUser.register();
        console.log("Usuário 'admin' registrado com sucesso (se não existia).");
    } catch (error) {
        if (error.message === "Nome de usuário já existe.") {
            console.log("Usuário 'admin' já existe.");
        } else {
            console.error("Falha ao registrar usuário inicial:", error);
        }
    }
}
registerInitialUser();