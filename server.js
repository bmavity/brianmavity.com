var sys = require('sys'),
    connect = require('connect'),
    app = require('express').createServer(),
    pub = __dirname + '/public';

connect.compiler.compilers['scss'] = require('scss/compiler');

app.set('view engine', 'jade');

app.use(connect.compiler({
  src: pub,
  enable: ['scss', 'sass'],
}));
app.use(connect.staticProvider(pub));

app.get('/', function(req, res) {
  res.render('home', {});
});

app.get('/contact', function(req, res) {
  res.render('contact', {});
});

app.get('/contact.html', function(req, res) {
  res.redirect('contact', 301);
});

app.get('/experience', function(req, res) {
  res.render('experience', {});
});

app.listen(parseInt(process.env.PORT, 10) || 8000);
