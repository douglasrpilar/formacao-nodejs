var http = require('http');

http.createServer(function(request, response) {
  response.end('Server Run!');
}).listen(3000);

console.log('Server running...');