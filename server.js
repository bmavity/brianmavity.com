var sys = require('sys'),
    connect = require('connect'),
    app = require('express').createServer(),
    repo = require('./mongo_repository'),
    pub = __dirname + '/public';
var fs = require('fs');

connect.compiler.compilers['scss'] = require('scss/compiler');

app.set('view engine', 'jade');

app.use(connect.compiler({
  src: pub,
  enable: ['scss', 'sass'],
}));
app.use(connect.staticProvider(pub));

var renderBlogIndex = function(req, res) {
  repo.findAll(function(err, results) {
    res.render('blog_index', {
      locals: {
        cssFiles: ['/css/blog.css'],
        posts: results
      }
    });
  });
};

var renderBlogPost = function(req, res) {
  repo.find(req.params.slug, function(post) {
    res.render('post_index', {
      locals: {
        cssFiles: ['/css/blog.css'],
        post: post
      }
    });
  });
};

app.get('/', function(req, res) {
  if(req.headers.host.indexOf('blog.') === 0) {
    renderBlogIndex(req, res);
  } else {
    res.render('home', {});
  }
});

app.get('/:staticFileName.html', function(req, res) {
  res.redirect(req.params.staticFileName, 301);
});

app.get('/contact', function(req, res) {
  res.render('contact', {
    locals: {
      cssFiles: ['/css/contact.css']
    }
  });
});

app.get('/experience', function(req, res) {
  res.render('experience', {
    locals: {
      cssFiles: ['/css/experience.css']
    }
  });
});

app.get('/blog', function(req, res) {
  renderBlogIndex(req, res);
});

app.get('/blog/atom', function(req, res) {
  repo.findAll(function(err, results) {
    var xml = require('./xmlBase');
    fs.readFile('./atom.js', function(err, buf) {
      var vm = require('vm');
          tags = xml.createTags(['entry', 'feed', 'link', 'id', 'title', 'subtitle', 'updated', 'author', 'name', 'published', 'content']);
      tags.posts = results;
      var r = vm.runInNewContext(buf.toString(), tags);
      console.log(r);
      res.writeHead(200, { 'Content-Type': 'application/atom+xml' });
      res.end(r);
    });
  });
});

app.get('/blog/:slug', renderBlogPost);


app.listen(parseInt(process.env.PORT, 10) || 8000);
