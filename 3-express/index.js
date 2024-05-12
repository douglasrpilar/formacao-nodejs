const express = require('express'); // Importa o Express.js
const app = express(); // Inicia o Express.js

app.get('/', function(req, res) {
  res.send('Home');
});

app.get('/profiles/:name?', function(req, res) {
  const name = req.params.name;

  if (name) {
    const viewType = req.query['viewType'];
    var body = 'Profile of "' + name + '"';

    if (viewType) {
      body += '<br />View type: ' + viewType;
    }

    res.send(body);
  }
  else {
    res.send('Profiles');
  }

});

app.listen(3000, function(error) {
  if (error) {
    console.log('Um erro ocorreu!');
  }
  else {
    console.log('Server running...')
  }

})