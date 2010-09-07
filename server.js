var sys = require('sys'),
    connect = require('connect'),
    app = require('express').createServer(),
    pub = __dirname + '/public';

app.set('view engine', 'jade');

app.use(connect.compiler({
  src: pub,
  enable: ['scss', 'sass'],
  compilers: [{ name: 'scss', compiler: require('scss/compiler') }]
}));
app.use(connect.staticProvider(pub));

app.get('/', function(req, res) {
  res.render('home', {});
});


app.listen(parseInt(process.env.PORT, 10) || 8000);
