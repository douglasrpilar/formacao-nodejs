const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser('i8tQkrI87KKdEI1Rs3cOkOqDT3A7a5N0'));
app.use(session({
  secret: 'i8tQkrI87KKdEI1Rs3cOkOqDT3A7a5N0',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 3600000 // 24h
  }
}));
app.use(flash());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  let errors = req.flash('errors');
  let values = req.flash('values');
  values = values.length == 0 ? [] : values[0];

  res.render('index', {
    errors,
    values
  });
});

app.post('/validation', (req, res) => {
  let values = req.body;
  let {name, email, age} = req.body;
  let errors = [];

  if (name == undefined || name == '') {
    errors.push({
      key: 'name',
      msg: 'Name is empty'
    });
  }

  if (email == undefined || email == '') {
    errors.push({
      key: 'email',
      msg: 'E-mail is empty'
    });
  }

  if (age == undefined || age == '') {
    errors.push({
      key: 'age',
      msg: 'Age is empty'
    });
  }
  else if (isNaN(age)) {
    errors.push({
      key: 'age',
      msg: 'Age is not a number'
    });
  }
  else {
    age = parseInt(age);
    if (age < 18) {
      errors.push({
        key: 'age',
        msg: 'Age is less than 18'
      });
    }
  }

  if (errors.length > 0) {
    req.flash('values', values);
    req.flash('errors', errors);
    res.redirect('/');
  }
  else {
    res.send('All Ok');
  }
});

app.listen(3006, (req, res) => {
  console.log('App running...');
});