const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());

// Body parser.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
  ]
}

app.get('/games', (req, res) => {
  res.statusCode = 200;
  res.json(DB.games);
});

app.get('/game/:id', (req, res) => {
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

app.post('/game', (req, res) => {
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

app.delete('/game/:id', (req, res) => {
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

app.put('/game/:id', (req, res) => {
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

app.listen(3003, () => {
  console.log('API running...');
});