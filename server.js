var http = require('http');
 
var server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  var html = '<! DOCTYPE html>';
  html += '<html>\n';
  html += '  <head>\n';
  html += '    <title>brianmavity.com</title>\n';
  html += '  </head>\n';
  html += '  <body>\n';
  html += '    <h1>Hi, I&rsquo;m Brian </h1>\n';
  html += '  </body>\n';
  html += '</html>';
  res.end(html);
});
 
server.listen(parseInt(process.ENV.port, 10) || 8000);
