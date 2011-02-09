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

var regularRoutes = function(app) {
  app.get('/', function(req, res) {
    renderHtml5(res)('home', {});
  });

  app.get('/:staticFileName.html', function(req, res) {
    res.redirect(req.params.staticFileName, 301);
  });

  app.get('/:view', function(req, res) {
    var view = req.params.view;
    renderHtml5(res)(view, {
      cssFiles: ['/css/' + view + '.css']
    });
  });
};

var blogRoutes = function(app) {
  app.get('/', function(req, res) {
    repo.findAll(function(err, results) {
      renderHtml5(res)('blog_index', {
        cssFiles: ['/css/blog.css'],
        posts: results
      });
    });
  });

  app.get('/:slug', function(req, res) {
    repo.find(req.params.slug, function(post) {
      renderHtml5(res)('post_index', {
        cssFiles: ['/css/blog.css'],
        post: post
      });
    });
  });

  app.get('/atom', function(req, res) {
    repo.findall(function(err, results) {
      tags.atom(__dirname + '/atomview', { posts: results }, function(err, feed) {
        res.writehead(200, { 'content-type': 'application/atom+xml' });
        res.end(feed);
      });
    });
  });
};

var mainServer = connect.vhost('localhost', connect.createServer(
  connect.logger(),
  connect.staticProvider(pub),
  connect.router(regularRoutes)
));
var blogServer = connect.vhost('blog.localhost', connect.createServer(
  connect.logger(),
  connect.staticProvider(pub),
  connect.router(blogRoutes)
));
var server = connect.createServer(
  connect.logger(),
  mainServer,
  blogServer
).listen(parseInt(process.env.PORT, 10) || 8000);
