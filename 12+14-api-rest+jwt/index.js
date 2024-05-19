const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const jwtSecret = 'dQqTRKLZPuAliTlvGwRUFEXLQDQ0OdoJwo5J0cDtzBT8W5qyLteHmaMsaMkviYjC';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const auth = (req, res, next) => {
  const authorization = req.headers['authorization'];

  if (authorization == undefined) {
    res.status(401);
    res.json({
      error: 'Invalid token.'
    });
  }
  else {
    const bearer = authorization.split(' ');
    const token = bearer[1];

    jwt.verify(token, jwtSecret, (err, data) => {
      if (err) {
        res.status(401);
        res.json({
          error: 'Invalid token.'
        });
      }
      else {
        req.token = token;
        let {id, name, email} = data;
        req.loggedUser = {id, name, email}
        next();
      }
    });
  }
}

const DB = {
  games: [
    {
      id:  1,
      name: 'Game 1',
      year: 1985,
      price: 78.45
    },
    {
      id:  2,
      name: 'Game 2',
      year: 2010,
      price: 47.00
    },
    {
      id:  3,
      name: 'Game 3',
      year: 2020,
      price: 50.74
    },
    {
      id:  4,
      name: 'Game 4',
      year: 1997,
      price: 80.50
    },
  ],
  users: [
    {
      id: 1,
      name: 'User 1',
      email: 'user1@email.com',
      password: '102030'
    },
    {
      id: 2,
      name: 'User 2',
      email: 'user2@email.com',
      password: '102030'
    },
    {
      id: 3,
      name: 'User 3',
      email: 'user3@email.com',
      password: '102030'
    }
  ]
}

app.get('/games', auth, (req, res) => {
  res.statusCode = 200;
  res.json(DB.games);
});

app.get('/game/:id', auth, (req, res) => {
  let id = req.params.id;

  if (isNaN(id)) {
    res.sendStatus(400);
  }
  else {
    id = parseInt(id);
    let game = DB.games.find(g => g.id == id);

    if (game == undefined) {
      res.sendStatus(404);
    }
    else {
      res.status(200);
      res.json(game);
    }
  }
});

app.post('/game', auth, (req, res) => {
  const {name, year, price} = req.body;

  if (
    name == undefined || year == undefined || price == undefined ||
    name == '' || isNaN(price) || isNaN(price)
  ) {
    res.sendStatus(400);
  }
  else {
    let id = 0;

    if (DB.games.length > 0) {
      ({ id } = DB.games.reduce((prev, cur) => (prev && prev.id > cur.id) ? prev : cur));
    }

    let game = {
      id: id + 1,
      name,
      year,
      price
    }

    DB.games.push(game);
    res.status(201);
    res.json(game);
  }
});

app.delete('/game/:id', auth, (req, res) => {
  let id = req.params.id;

  if (isNaN(id)) {
    res.sendStatus(400);
  }
  else {
    id = parseInt(id);
    let index = DB.games.findIndex(g => g.id == id);

    if (index == -1) {
      res.sendStatus(404);
    }
    else {
      DB.games.splice(index, 1);
      res.sendStatus(200);
    }
  }
});

app.put('/game/:id', auth, (req, res) => {
  let id = req.params.id;

  if (isNaN(id)) {
    res.sendStatus(400);
  }
  else {
    id = parseInt(id);
    let game = DB.games.find(g => g.id == id);

    if (game == undefined) {
      res.sendStatus(404);
    }
    else {
      let {name, year, price} = req.body;
      let error = false;
      let updatedGame = game;

      if (name != undefined) {
        if (name == '') {
          error = true;
        }
        else {
          updatedGame.name = name;
        }
      }

      if (!error && year != undefined) {
        if (isNaN(year)) {
          error = true;
        }
        else {
          updatedGame.year = year;
        }
      }

      if (!error && price != undefined) {
        if (isNaN(price)) {
          error = true;
        }
        else {
          updatedGame.price = price;
        }
      }

      if (error) {
        res.sendStatus(400);
      }
      else {
        game = updatedGame;
        res.sendStatus(200);
      }
    }
  }
});

app.post('/auth', (req, res) => {
  let {email, password} = req.body;

  if (email == undefined || email == '') {
    res.status(400);
    res.json({
      error: 'Enter a valid email.'
    });
  }
  else if (password == undefined || password == '') {
    res.status(400);
    res.json({
      error: 'Enter a valid password.'
    });
  }
  else {
    let user = DB.users.find(u => u.email == email);

    if (user == undefined || user.password != password) {
      res.status(401);
      res.json({
        error: 'Not authorized.'
      });
    }
    else {
      let {id, name, email} = user;
      jwt.sign(
        {
          id,
          name,
          email
        },
        jwtSecret,
        {
          expiresIn: '24h'
        },
        (err, token) => {
          if (err) {
            res.status(500);
            res.json({
              error: 'Failed to generate token.'
            });
          }
          else {
            res.status(200);
            res.json({
              token
            });
          }
        }
      );
    }
  }
});

app.listen(3003, () => {
  console.log('API running...');
});