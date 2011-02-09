var connect = require('connect'),
    repo = require('./mongo_repository'),
    pub = __dirname + '/public',
    tags = require('./tags');

var renderHtml5 = function(res) {
  return function(view, vars) {
    var viewFileName = __dirname + '/views/' + view + '.js';
    tags.html5(viewFileName, vars, function(err, content) {
      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': content.length
      });
      res.end(content);
    });
  };
};

var routes = function(app) {
  var renderBlogIndex = function(req, res) {
    repo.findAll(function(err, results) {
      renderHtml5(res)('blog_index', {
        cssFiles: ['/css/blog.css'],
        posts: results
      });
    });
  };

  var renderBlogPost = function(req, res) {
    repo.find(req.params.slug, function(post) {
      renderHtml5(res)('post_index', {
        cssFiles: ['/css/blog.css'],
        post: post
      });
    });
  };

  app.get('/', function(req, res) {
    if(req.headers.host.indexOf('blog.') === 0) {
      renderBlogIndex(req, res);
    } else {
      renderHtml5(res)('home');
    }
  });

  app.get('/:staticFileName.html', function(req, res) {
    res.redirect(req.params.staticFileName, 301);
  });

  app.get('/contact', function(req, res) {
    renderHtml5(res)('contact', {
      cssFiles: ['/css/contact.css']
    });
  });

  app.get('/experience', function(req, res) {
    renderHtml5(res)('experience', {
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
      tags.atom(__dirname + '/atomView', { posts: results }, function(err, feed) {
        res.writeHead(200, { 'Content-Type': 'application/atom+xml' });
        res.end(feed);
      });
    });
  });

  app.get('/blog/:slug', renderBlogPost);
}


var server = connect.createServer();
server.use(connect.logger());
server.use(connect.staticProvider(pub));
server.use(connect.router(routes));
server.listen(parseInt(process.env.PORT, 10) || 8000);
