let http = require('http'),
    express = require('express'),
    path = require('path'),
    app = express(),
    hbs = require('hbs');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/mensagem_get', (req, res) => {
    let msg = req.query.mensagem;
    console.log(msg);
    res.end();
});

app.use(express.urlencoded({extended: false}));

app.post('/mensagem_post', (req, res) => {
    let msg = req.body.mensagem;
    console.log(msg);
    res.end();
});

http.createServer(app).listen(3000);