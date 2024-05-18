const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

axios.defaults.baseURL = 'http://localhost:3003';

// Body parser.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  let games = [];

  try {
    response = await axios.get('/games');
    games = response.data;
  }
  catch(error) {
    // manipula erros da requisição
    console.error(error);
  }

  res.render('index', {
    games: games,
  });
});

app.listen(3005, () => {
  console.log('App running...');
});