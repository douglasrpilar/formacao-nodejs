const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// Sessions.
const hour = 3600000;
app.use(session({
  secret: 'i8tQkrI87KKdEI1Rs3cOkOqDT3A7a5N0',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * hour,
  }
}));

const apiUrl = 'http://localhost:3003';

const auth = (req, res, next) => {
  if (req.session.jwtToken == undefined || req.session.jwtToken == '') {
    res.redirect('/login');
  }
  else {
    next();
  }
}

app.get('/login', (req, res) => {
  if (req.session.jwtToken != undefined && req.session.jwtToken != '') {
    res.redirect('/');
  }
  else {
    res.render('login');
  }
});

app.post('/auth', async (req, res) => {
  let {email, password} = req.body;

  if (
    email == undefined || email == '' ||
    password == undefined || password == ''
  ) {
    res.redirect('/login');
  }
  else {
    try {
      let response = await axios.post(apiUrl + '/auth', {email, password});
      req.session.jwtToken = response.data?.token;
      res.redirect('/');
    }
    catch(error) {
      console.error(error);
      res.redirect('/login');
    }
  }
});

app.get('/', auth, async (req, res) => {
  let games = [];
  let axiosConfig = {
    baseURL: apiUrl,
    headers: {
      Authorization: 'Bearer ' + req.session.jwtToken
    }
  }

  try {
    let response = await axios.get('/games', axiosConfig);
    games = response.data;
  }
  catch(error) {
    console.error(error);
  }

  res.render('index', {
    axiosConfig,
    games
  });
});

app.listen(3005, () => {
  console.log('App running...');
});