var sys = require('sys'),
    connect = require('connect'),
    app = require('express').createServer(),
    repo = require('./mongo_repository'),
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
  res.render('contact', {
    locals: {
      cssFiles: ['/css/contact.css']
    }
  });
});

app.get('/contact.html', function(req, res) {
  res.redirect('contact', 301);
});

app.get('/experience', function(req, res) {
  res.render('experience', {
    locals: {
      cssFiles: ['/css/experience.css']
    }
  });
});

app.get('/experience.html', function(req, res) {
  res.redirect('experience', 301);
});

app.get('/echo', function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text' });
  res.end(sys.inspect(req.headers));
});

app.get('/blog', function(req, res) {
  repo.findAll(function(err, results) {
    res.render('blog_index', {
      locals: {
        cssFiles: ['/css/blog.css'],
        posts: results
      }
    });
  });
});

app.get('/blog/:slug', function(req, res) {
  repo.find(req.params.slug, function(post) {
    res.render('post_index', {
      locals: {
        cssFiles: ['/css/blog.css'],
        post: post
      }
    });
  });
});

app.listen(parseInt(process.env.PORT, 10) || 8000);
