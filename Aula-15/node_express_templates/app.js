let http = require('http'),
    express = require('express'),
    path = require('path'),
    app = express(),
    Posts = require('./model/Posts'),
    hbs = require('hbs');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/pato', (req, res) => {
    res.render('pato');
});

app.get('/posts', async (req, res) => {
    const busca = req.query.busca,
        posts = await Posts.find(busca);
    console.log(busca)
    res.render('posts', { posts: posts });
})

app.listen(3000);
