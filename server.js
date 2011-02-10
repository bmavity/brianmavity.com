var connect = require('connect'),
    repo = require('./mongo_repository'),
    pub = __dirname + '/public',
    tags = require('./tags'),
    env = process.env,
    context = {
      blog: env.BLOG_APP || 'blog.localhost',
      main: env.MAIN_APP || 'localhost'
    },
    port = parseInt(env.PORT, 10) || 8000;

// stolen from express.js
require('http').ServerResponse.prototype.redirect = function(url, status){
  var basePath = this.app.set('home') || '/'
    , status = status || 302
    , body;

  // Setup redirect map
  var map = {
    back: this.req.headers.referrer || this.req.headers.referer || basePath,
    home: basePath
  };

  // Support custom redirect map
  map.__proto__ = this.app.redirects;

  // Attempt mapped redirect
  var mapped = typeof map[url] === 'function'
    ? map[url](this.req, this)
    : map[url];

  // Perform redirect
  url = mapped || url;

  // Support text/{plain,html} by default
  if (this.req.accepts('html')) {
    body = '<p>' + http.STATUS_CODES[status] + '. Redirecting to <a href="' + url + '">' + url + '</a></p>';
    this.header('Content-Type', 'text/html');
  } else {
    body = http.STATUS_CODES[status] + '. Redirecting to ' + url;
    this.header('Content-Type', 'text/plain');
  }

  // Respond
  this.send(body, { Location: url }, status);
};

var urlize = function(host) {
  return 'http://' + host + ':' + port;
};

var createContext = function(req) {
  return {
    blog: urlize(context.blog),
    main: urlize(context.main)
  };
};

var renderHtml5 = function(res) {
  return function(view, vars) {
    var viewFileName = __dirname + '/views/' + view + '.js';
    vars.context = createContext();
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
    renderHtml5(res)('home', createContext(req));
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

  app.get('/atom', function(req, res) {
    repo.findAll(function(err, results) {
      tags.atom(__dirname + '/atomView.js', { posts: results }, function(err, feed) {
        res.writeHead(200, { 'Content-Type': 'application/atom+xml' });
        res.end(feed);
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
};

var mainServer = connect.vhost(context.main, connect.createServer(
  connect.logger(),
  connect.staticProvider(pub),
  connect.router(regularRoutes)
));
var blogServer = connect.vhost(context.blog, connect.createServer(
  connect.logger(),
  connect.staticProvider(pub),
  connect.router(blogRoutes)
));
if(env.NON_WWW) {
  var redirect = connect.vhost(env.NON_WWW, connect.createServer(function(req, res) {
    res.redirect(createContext().main, 301);
  }));
  var server = connect.createServer(
    connect.logger(),
    mainServer,
    blogServer,
    redirect
  ).listen(port);
} else {
  var server = connect.createServer(
    connect.logger(),
    mainServer,
    blogServer
  ).listen(port);
}
