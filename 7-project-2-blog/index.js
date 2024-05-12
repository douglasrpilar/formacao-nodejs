const express = require('express');
const session = require('express-session');
const locals = require('./middlewares/locals');

// Controllers
const ErrorsController = require('./errors/ErrorsController');
const CategoriesController = require('./categories/CategoriesController');
const ArticlesController = require('./articles/ArticlesController');
const UsersController = require('./users/UsersController');

// Models
const Category = require('./categories/Category');
const Article = require('./articles/Article');

const connection = require('./database/connection');
const bodyParser = require('body-parser');
const app = express();

// View engine.
app.set('view engine', 'ejs');

// Redis. (Banco de dados focado em salvamento de sessões e cache)
// Por default o express-session salva na memória.

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

// Static files.
app.use(express.static('public'));

// Body parser.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database.
connection.authenticate()
  .then(() => {
    console.log('Database connection OK!');
  })
  .catch((error) => {
    console.log(error);
  });

// Routes.

app.use('/', ErrorsController);

app.use('/', CategoriesController);

app.use('/', ArticlesController);

app.use('/', UsersController);

app.get('/', locals, (req, res) => {
  var page = req.query.page ? req.query.page : 0;
  page = isNaN(page) ? 0 : parseInt(page);
  page = page < 1 ? 0 : page;
  const limit = 4;
  const offset = page * limit;

  Article.findAndCountAll({
    offset: offset,
    limit: limit,
    order: [
      ['id', 'DESC']
    ]
  }).then((articles) => {
    Category.findAll({
      order: [
        ['title', 'ASC']
      ]
    }).then((categories) => {
      const hasNext = (offset + limit) < articles.count;

      res.render('index', {
        pager: {
          current: page,
          prev: page == 0 ? null : page - 1,
          next: hasNext ? page + 1 : null,
        },
        count: articles.count,
        articles: articles.rows,
        categories: categories
      });

    });
  });
});

app.get('/article/:slug', locals, (req, res) => {
  const slug = req.params.slug;

  Article.findOne({
    where: {
      slug: slug,
    }
  }).then((article) => {
    if (article != undefined) {
      Category.findAll({
        order: [
          ['title', 'ASC']
        ]
      }).then((categories) => {
        res.render('article', {
          article: article,
          categories: categories
        });
      });
    }
    else {
      res.redirect('/404');
    }
  }).catch( (error) => {
    res.redirect('/404');
  })
});

app.get('/category/:slug', locals, (req, res) => {
  const slug = req.params.slug;

  Category.findOne({
    where: {
      slug: slug,
    },
    include: [
      {
        model: Article,
      }
    ],
  }).then((category) => {
    if (category != undefined) {
      Category.findAll({
        order: [
          ['title', 'ASC']
        ]
      }).then((categories) => {
        res.render('category', {
          category: category,
          categories: categories
        });
      });
    }
    else {
      res.redirect('/404');
    }
  }).catch( (error) => {
    res.redirect('/404');
  })
});

app.listen(3002, () => {
  console.log('App running...');
})