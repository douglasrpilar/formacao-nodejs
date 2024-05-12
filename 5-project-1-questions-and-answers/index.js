const express = require('express');
const connection = require('./database/connection');
const Question = require('./database/Question');
const Answer = require('./database/Answer');
const bodyParser = require('body-parser');
const app = express();

/*connection
  .authenticate()
  .then(() => {
    console.log('Database connection OK!');
  })
  .catch((error) => {
    console.log(error);
  });*/

app.set('view engine', 'ejs'); // Digo para o express usar o EJS como renderizador de HTML.
app.use(express.static('public'));

// Body parser.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes.
app.get('/404', (req, res) => {
  res.render('404');
});

app.get('/', (req, res) => {
  Question.findAll(
    {
      raw: true,
      order: [
        ['id', 'DESC']
      ]
    }
  ).then(( questions ) => {
    res.render('index', {
      questions: questions,
    });
  });
});

app.get('/question', (req, res) => {
  res.render('question-form');
});

app.post('/question/save', (req, res) => {
  const title = req.body.title;
  const description = req.body.description;

  Question.create({
    title: title,
    description: description,
  }).then(() => {
    res.redirect('/');
  })
  .catch((error) => {
    res.redirect('/question');
  });

});

app.get('/question/:id', (req, res) => {
  const id = req.params.id;

  Question.findOne({
    where: {
      id: id
    }
  }).then( question => {
    if (question != undefined) {
      Answer.findAll({
        where: {
          qid: id
        },
        order: [
          ['id', 'DESC']
        ]
      }).then( answers => {
        res.render('question', {
          question: question,
          answers: answers
        });
      });
    }
    else {
      res.redirect('/404');
    }
  });
});

app.post('/answer/save', (req, res) => {
  const qid = req.body.qid;
  const body = req.body.body;

  Answer.create({
    qid: qid,
    body: body,
  }).then(() => {
    res.redirect('/question/' + qid);
  })
  .catch((error) => {
    res.redirect('/question/' + qid);
  });

});

app.listen(3001, () => {
  console.log('App running...');
})