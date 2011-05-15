var connect = require('connect');

var server = connect.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('clippy!');
});


exports.vhost = function() {
  return server;
};
