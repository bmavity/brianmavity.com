var http = require('http');
 
var server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" })
  var html = '<! DOCTYPE html>';
  html += '<html>\n';
  html += '  <head>\n';
  html += '    <title>Chapelle Inspired Hello World</title>\n';
  html += '  </head>\n';
  html += '  <body>\n';
  html += '    <h1>Evenin&rsquo;, Bitches!</h1>\n';
  html += '  </body>\n';
  html += '</html>';
  res.end(html);
});
 
server.listen(8000);
