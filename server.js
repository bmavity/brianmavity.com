var sys = require('sys'),
    connect = require('connect'),
    app = require('express').createServer(),
    repo = require('./mongo_repository'),
    pub = __dirname + '/public',
    tags = require('./tags');

connect.compiler.compilers['scss'] = require('scss/compiler');

app.set('view engine', 'jade');

app.use(connect.compiler({
  src: pub,
  enable: ['scss', 'sass'],
}));
app.use(connect.staticProvider(pub));

var renderBlogIndex = function(req, res) {
  repo.findAll(function(err, results) {
    tags.html5(__dirname + '/views/blog_index.js', {
        cssFiles: ['/css/blog.css'],
        posts: results
      },
      function(err, content) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    });
  });
};

var renderBlogPost = function(req, res) {
  repo.find(req.params.slug, function(post) {
    tags.html5(__dirname + '/views/post_index.js', {
        cssFiles: ['/css/blog.css'],
        post: post
      },
      function(err, content) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    });
  });
};

app.get('/', function(req, res) {
  if(req.headers.host.indexOf('blog.') === 0) {
    renderBlogIndex(req, res);
  } else {
    tags.html5(__dirname + '/views/home.js', function(err, content) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    });
  }
});

app.get('/:staticFileName.html', function(req, res) {
  res.redirect(req.params.staticFileName, 301);
});

app.get('/contact', function(req, res) {
  tags.html5(__dirname + '/views/contact.js', {
      cssFiles: ['/css/contact.css']
    },
    function(err, content) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
  });
});

app.get('/experience', function(req, res) {
  tags.html5(__dirname + '/views/experience.js', {
      cssFiles: ['/css/experience.css']
    },
    function(err, content) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
  });
});

app.get('/blog', function(req, res) {
  renderBlogIndex(req, res);
});

app.get('/blog/atom', function(req, res) {
  repo.findAll(function(err, results) {
    tags.atom(__dirname + '/atomView.js', { posts: results }, function(err, feed) {
      res.writeHead(200, { 'Content-Type': 'application/atom+xml' });
      res.end(feed);
    });
  });
});

app.get('/blog/:slug', renderBlogPost);


app.listen(parseInt(process.env.PORT, 10) || 8000);
