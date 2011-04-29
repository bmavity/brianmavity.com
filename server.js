var connect = require('connect'),
    repo = require('./mongo_repository'),
    pub = __dirname + '/public',
    tags = require('./node_modules/tags/tags')({
      viewFolder: __dirname + '/views/'
    }),
    env = process.env,
    context = {
      blog: env.BLOG_APP || 'blog.localhost',
      main: env.MAIN_APP || 'localhost'
    },
    isProduction = env.PRODUCTION,
    port = parseInt(env.PORT, 10) || 8000;

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
    vars.context = createContext();
    tags.html5(view, vars, function(err, content) {
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

  app.get('/blog/:slug', function(req, res) {
    res.writeHead(301, { Location: createContext().blog + '/' + req.params.slug });
    res.end();
  });

  app.get('/blog', function(req, res) {
    res.writeHead(301, { Location: createContext().blog + '/' });
    res.end();
  });

  app.get('/:staticFileName.html', function(req, res) {
    res.writeHead(301, { Location: req.params.staticFileName });
    res.end();
  });

  app.get('/:view', function(req, res) {
    renderHtml5(res)(req.params.view, {});
  });
};
/*
var blogRoutes = function(app) {
  app.get('/blog/:slug', function(req, res) {
    res.writeHead(301, { Location: createContext().blog + '/' + req.params.slug });
    res.end();
  });

  app.get('/', function(req, res) {
    repo.findAll(function(err, results) {
      renderHtml5(res)('blog_index', {
        posts: results
      });
    });
  });

  app.get('/atom', function(req, res) {
    repo.findAll(function(err, results) {
      tags.atom(__dirname + '/node_modules/tags/atomView.js', { posts: results }, function(err, feed) {
        res.writeHead(200, { 'Content-Type': 'application/atom+xml' });
        res.end(feed);
      });
    });
  });

  app.get('/:slug', function(req, res) {
    repo.find(req.params.slug, function(post) {
      renderHtml5(res)('post_index', {
        post: post
      });
    });
  });
};
*/
var mainServer = connect.createServer();
if(!isProduction) {
  mainServer.use(connect.logger());
}
mainServer.use(connect.static(pub));
mainServer.use(connect.router(regularRoutes));
/*
var blogServer = connect.createServer();
if(!isProduction) {
  blogServer.use(connect.logger());
}
blogServer.use(connect.static(pub));
blogServer.use(connect.router(blogRoutes));

var server = connect.createServer();
if(!isProduction) {
  server.use(connect.logger());
}
server.use(connect.vhost(context.main, mainServer));
server.use(connect.vhost(context.blog, blogServer));
if(env.NON_WWW) {
  server.use(connect.vhost(env.NON_WWW, connect.createServer(function(req, res) {
    res.writeHead(301, { Location: createContext().main + req.url });
    res.end();
  })));
}

*/
/*
var server = require('http').createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ouchies');
});
*/
var server = mainServer;
server.listen(port);
